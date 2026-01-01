export const CARREFOUR_SCRIPT = `
(function(){
    window.carrefour = {};
    window.carrefour.result = {};

    window.carrefour.base_url = '//www.carrefour.fr';
    window.carrefour.foodCat = new Array(
        'Fruits et Légumes', 'Viandes et Poissons', 'Pains et Pâtisseries', 'Frais', 'Surgelés', 'Epicerie sucrée', 'Epicerie salée', 'Régimes alimentaires'
    );

    window.carrefour.jsonRequest = async function(slug) {
        const reply = await fetch(window.carrefour.base_url+slug, {
            method: 'GET',
            headers: { 
                'Accept': 'application/json, text/plain, */*',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });
        try {
            return await reply.json();
        } catch (e) {
            return { data: [], meta: { totalPage: 0 } };
        }
    }

    window.carrefour.getSlugbyPagenumber = function(n) {
        return '/promotions?noRedirect=1&page='+ n
    }

    window.carrefour.getReplybyPagenumber = function(n) {
        return window.carrefour.jsonRequest(window.carrefour.getSlugbyPagenumber(n));
    }

    window.carrefour.transformProduct = function(item) {
        const itemAttributes = item.attributes
        const itemPromotion = itemAttributes.offers[itemAttributes.ean][itemAttributes.offerServiceId]
        const itemPromotionType = itemPromotion.attributes.promotion
        let initPrice = itemPromotionType.messageArgs.initialPrice
        if (itemPromotionType.messageArgs.quantity) {
            initPrice = initPrice * itemPromotionType.messageArgs.quantity
        }
        const finalPrice = Math.round((initPrice - itemPromotionType.messageArgs.discountAmount)*100)/100;
        const reducPercent = Math.round((100 - ((finalPrice*100) / initPrice)));
        let isFood = false;
        let reducType = 'discount';
        if (itemPromotionType.isLoyalty) {
            reducType = 'fid';
        }
        if (window.carrefour.foodCat.indexOf(itemAttributes.topCategoryName) !== -1) {
            isFood = true;
        }
        return {
            article: itemAttributes.title,
            url: window.carrefour.base_url + item.links.self,
            reduc : reducPercent,
            reductype : reducType,
            pxinitial : itemPromotionType.messageArgs.initialPrice,
            pxfinal : ((itemPromotionType.isLoyalty) ? finalPrice : itemPromotionType.messageArgs.discountedPrice),
            cagnotte : ((itemPromotionType.isLoyalty) ? Math.round((itemPromotionType.messageArgs.initialPrice-finalPrice)*100)/100 : 0),
            isfood: isFood
        }
    }

    window.carrefour.filterProduct = function(item) {
        const product = window.carrefour.transformProduct(item);
        switch (product.reductype) {
            case 'discount':
                if (product.reduc > window.discountPriceDetect) {
                    window.carrefour.finalProductDirect.push(product);
                }
                break;
            case 'fid':
                if (product.reduc > window.discountPriceDetect) {
                   window.carrefour.finalProductFidelite.push(product);
                }
                break;
        }
        if (product.isfood && product.reduc > 34) {
            window.carrefour.finalProductFood.push(product);
        }
    }
    
    window.carrefour.hasReduc = function(item) {
        const itemAttributes = item.attributes;
        const itemEan = itemAttributes.offers[itemAttributes.ean]
        if (itemEan == null || itemEan == undefined){
            return false
        }
        const itemPromotion = itemAttributes.offers[itemAttributes.ean][itemAttributes.offerServiceId];
        return itemAttributes && itemPromotion != undefined && itemPromotion.attributes.promotion !== null;
    }

    window.carrefour.filterProductList = function(products) {
        products.forEach(function(item){
            if (window.carrefour.hasReduc(item)) {
                window.carrefour.filterProduct(item);
            } else {
                console.log(item.attributes.title + " ==> https://www.carrefour.fr" + item.links.self)
            }
        })
    }

    window.carrefour.scanPage = async function (n) {
        const result = await window.carrefour.getReplybyPagenumber(n);
        await window.carrefour.filterProductList(result['data']);
    }

    window.carrefour.scan = async function (discountPriceDetect) {
        const result = await window.carrefour.getReplybyPagenumber(1);
        const totalPage = result['meta']['totalPage'];

        window.discountPriceDetect = discountPriceDetect;
        window.carrefour.finalProductDirect = [];
        window.carrefour.finalProductFidelite = [];
        window.carrefour.finalProductFood = [];	
        
        let tasks = [window.carrefour.filterProductList(result['data'])];
        for(let currentPage = 2; currentPage <= totalPage; currentPage++){
            tasks.push(window.carrefour.scanPage(currentPage));
        }
        await Promise.all(tasks);
    }
})();
`;