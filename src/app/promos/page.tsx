'use client';

import { useState } from 'react';
import styles from '../page.module.css';
import { STORES } from '../constants/stores';

interface Product {
  article: string;
  url: string;
  reduc: number;
  reductype: string;
  pxinitial: number;
  pxfinal: number;
  cagnotte: number;
  isfood: boolean;
}

interface ScanResult {
  direct: Product[];
  fidelite: Product[];
  food: Product[];
}

export default function PromotionsPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedStoreId, setSelectedStoreId] = useState('');
  const [minDiscount, setMinDiscount] = useState(50);
  const [results, setResults] = useState<ScanResult | null>(null);


  const lancerScan = async () => {
    if (!selectedStoreId) return;

    const storeName = STORES.find((s: any) => s.id === selectedStoreId)?.name;
    setLoading(true);
    setMessage(`Lancement du scan pour ${storeName}...`);
    setResults(null);
    
    try {
      const response = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ magasin: selectedStoreId, minDiscount }),
      });
      
      const data = await response.json();
      setMessage(data.message || 'Scan terminé.');
      if (data.data) {
        setResults(data.data);
      }
    } catch (error) {
      setMessage('Erreur lors du scan: ' + error);
      console.error(error);

    } finally {
      setLoading(false);
    }
  };

  const renderProductList = (title: string, products: Product[]) => {
    if (!products || products.length === 0) return null;

    return (
      <div style={{ marginTop: '30px', width: '100%' }}>
        <h2 style={{ color: '#fff', borderBottom: '1px solid #444', paddingBottom: '10px', marginBottom: '15px' }}>
          {title} ({products.length})
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {products.map((p, index) => (
            <div key={index} style={{ background: '#222', padding: '15px', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                  <span style={{ background: '#e1000f', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.9em' }}>
                    -{p.reduc}%
                  </span>
                  {p.cagnotte > 0 && (
                    <span style={{ background: '#2c3e50', color: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '0.8em' }}>
                      Cagnotte: {p.cagnotte}€
                    </span>
                  )}
                </div>
                <a href={`https:${p.url}`} target="_blank" rel="noopener noreferrer" style={{ color: '#fff', textDecoration: 'none', fontWeight: '500', display: 'block', marginBottom: '10px' }}>
                  {p.article}
                </a>
              </div>
              <div style={{ marginTop: 'auto' }}>
                <div style={{ color: '#888', textDecoration: 'line-through', fontSize: '0.9em' }}>{p.pxinitial} €</div>
                <div style={{ color: '#fff', fontSize: '1.2em', fontWeight: 'bold' }}>{p.pxfinal} €</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <main className={styles.page}>
      <h1 style={{ color: '#fff', marginBottom: '20px' }}>Choisissez un magasin</h1>

      <select
        value={selectedStoreId}
        onChange={(e) => setSelectedStoreId(e.target.value)}
        style={{ padding: '10px', marginBottom: '20px', width: '100%', maxWidth: '400px', color: '#000' }}
      >
        <option value="">-- Sélectionner un magasin --</option>
        {STORES.map((store : any) => (
          <option key={store.id} value={store.id}>
            {store.name}
          </option>
        ))}
      </select>

      <div style={{ marginBottom: '20px', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <label htmlFor="minDiscount">Réduction minimum (%) :</label>
        <input
          id="minDiscount"
          type="number"
          min="50"
          max="100"
          value={minDiscount}
          onChange={(e) => setMinDiscount(Number(e.target.value))}
          style={{ padding: '10px', width: '80px', borderRadius: '5px', border: 'none', textAlign: 'center' }}
        />
      </div>

      <button className={styles.button} onClick={lancerScan} disabled={loading || !selectedStoreId} style={{ opacity: loading || !selectedStoreId ? 0.5 : 1 }}>
        {loading ? 'Scan en cours...' : 'Lancer le scan'}
      </button>

      {message && <p style={{ color: '#fff', marginTop: '20px' }}>{message}</p>}

      {results && (
        <div style={{ width: '100%', maxWidth: '1200px' }}>
          {renderProductList('Réductions Immédiates', results.direct)}
          {renderProductList('Réductions Fidélité', results.fidelite)}
          {renderProductList('Alimentaire', results.food)}
        </div>
      )}
    </main>
  );
}