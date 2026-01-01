import { NextResponse } from 'next/server';
import { chromium } from 'playwright';
import { CARREFOUR_SCRIPT } from '../../promos/carrefourScript';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { magasin, minDiscount } = body;

    if (!magasin) {
      return NextResponse.json(
        { message: 'ID du magasin manquant' },
        { status: 400 }
      );
    }

    console.log(`[API] Démarrage du scan Playwright pour le magasin : ${magasin}`);

    // Lancement du navigateur
    const browser = await chromium.launch({
      headless: false, // Mettre à false pour voir le navigateur en local
    });

    const context = await browser.newContext();

    // Injection du cookie pour définir le magasin sélectionné
    await context.addCookies([{
      name: 'FRONTAL_STORE',
      value: magasin,
      domain: '.carrefour.fr',
      path: '/'
    }]);

    const page = await context.newPage();

    // Navigation vers le site (le magasin sera déjà pris en compte grâce au cookie)
    await page.goto('https://www.carrefour.fr', { waitUntil: 'domcontentloaded' });

    // Injection du script de scraping
    await page.addScriptTag({ content: CARREFOUR_SCRIPT });


    const results = await page.evaluate(async (threshold) => {
      // @ts-ignore
      await window.carrefour.scan(threshold); // Scan avec filtre dynamique
      return {
        // @ts-ignore
        direct: window.carrefour.finalProductDirect,
        // @ts-ignore
        fidelite: window.carrefour.finalProductFidelite,
        // @ts-ignore
        food: window.carrefour.finalProductFood
      };
    }, minDiscount || 50);
    
    await browser.close();

    const total = results.direct.length + results.fidelite.length + results.food.length;

    return NextResponse.json({
      message: `Scan terminé. ${total} produits trouvés (Direct: ${results.direct.length}, Fidélité: ${results.fidelite.length}, Alimentation: ${results.food.length}).`,
      data: results
    });

  } catch (error) {
    console.error('[API] Erreur Playwright:', error);
    return NextResponse.json(
      { message: 'Erreur lors du scan', error: String(error) },
      { status: 500 }
    );
  }
}