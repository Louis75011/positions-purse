import React, { useState } from 'react';
import { Order, Position } from '../services/interfaces/Purse';
import positionsData from '../services/data/purseData.json';
import "../App.scss"

const PositionsTable: React.FC = () => {
  const [sortOrder, setSortOrder] = useState<any | number>('asc');
  const [sortedBy, setSortedBy] = useState<any | number>('name');
  // chaque constante a en entrée un tableau de données génériques et un tableau de propriétés
  const mapData = <T,>(data: T[], props: (keyof T)[]): Partial<T>[] =>
  data.map((item) =>
    props.reduce((acc, prop) => ({ ...acc, [prop]: item[prop] }), {})
  ); // itère chaque data, reduce boucle sur chaque propriété, el ajouté en tant que propriété courante, retourne l'objet à jour

    // const mapData = <T,>(data: T[], props: (keyof T)[]): Partial<T>[] =>
    // data.map((item) =>
    //   props.reduce((acc, prop) => ({ ...acc, [prop]: item[prop] }), {})
    // );


  const positions: Position[] = mapData(positionsData.positions, [
    'id',
    'name',
    'ticker',
    'isin',
    'quantity',
    'price',
    'previousPrice',
    'valuation',
    'previousValuation',
    'averagePrice',
    'previousAveragePrice',
    'averageCost',
    'previousAverageCost',
    'weight',
  ]).sort((a, b) => {
    if (sortOrder === 'desc') {
      return b[sortedBy]! - a[sortedBy]!;
    }
    return a[sortedBy]! - b[sortedBy]!;
  }) as Position[];

  const handleSortClick = (sortBy: 'name' | 'quantity' | 'price' | 'valuation') => {
    if (sortedBy === sortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortedBy(sortBy);
      setSortOrder('asc');
    }
  };

  // const positions = mapData(positionsData.positions, ['id', 'name', 'ticker', 'isin', 'quantity', 'price', 'previousPrice', 'valuation', 'previousValuation', 'averagePrice', 'previousAveragePrice', 'averageCost', 'previousAverageCost', 'weight',]);
  const srdPositions = mapData(positionsData.srdPositions, ['id', 'name', 'ticker', 'isin', 'quantity', 'price', 'previousPrice', 'valuation', 'previousValuation', 'averagePrice', 'previousAveragePrice', 'averageCost', 'previousAverageCost', 'weight', 'borrowing', 'liquidation',]);
  const orders = mapData(positionsData.orders, ['id', 'positionId', 'status', 'quantity', 'price',]) as Order[];

  return (
    <div>
      <h2 className="highlighted-title m20">Trier par valeurs de chaque position</h2>
      <div className="row m20">
        <div className="col-sm-12">
          <div className="d-flex justify-content-between mb-3">
            <button className="btn btn-outline-secondary" onClick={() => handleSortClick('name')}>
              Nom
            </button>
            <button className="btn btn-outline-secondary" onClick={() => handleSortClick('quantity')}>
              Quantité
            </button>
            <button className="btn btn-outline-secondary" onClick={() => handleSortClick('price')}>
              Cours
            </button>
            <button className="btn btn-outline-secondary" onClick={() => handleSortClick('valuation')}>
              Valorisation
            </button>
          </div>
        </div>
      </div>

      <h2 className='highlighted-title m20'>Positions</h2>
      <div className="row m20">
        {positions.map((position) => (
          <div className="col-sm-6 col-xs-10" key={position.id}>
            <div className="name-underline">{position.name}</div>
            <p><strong>Ticker:</strong> {position.ticker}</p>
            <p><strong>ISIN:</strong> {position.isin}</p>
            <p><strong>Quantités:</strong> {position.quantity}</p>
            <p><strong>Cours:</strong> {position.price}</p>
            <p><strong>Valorisation:</strong> {position.valuation}</p>
            <p><strong>Valorisation veille:</strong> {position.previousValuation}</p>
            <p><strong>PRU:</strong> {position.averagePrice}</p>
            <p><strong>PRU veille:</strong> {position.previousAveragePrice}</p>
            <p><strong>Poids (%):</strong> {position.weight}%</p>
          </div>
        ))}
      </div>

      <h2 className='highlighted-title m20'>Positions SRD</h2>
      <div className="row m20">
        {srdPositions.map((srdPosition) => (
          <div className="col-sm-6 col-xs-10" key={srdPosition.isin}>
            <div className='name-underline'>{srdPosition.name}</div>
            <p><strong>Ticker:</strong> {srdPosition.ticker}</p>
            <p><strong>ISIN:</strong> {srdPosition.isin}</p>
            <p><strong>Quantités:</strong> {srdPosition.quantity}</p>
            <p><strong>Cours:</strong> {srdPosition.price}</p>
            <p><strong>Valorisation:</strong> {srdPosition.valuation}</p>
            <p><strong>Valorisation veille:</strong> {srdPosition.previousValuation}</p>
            <p><strong>PRU:</strong> {srdPosition.averagePrice}</p>
            <p><strong>PRU veille:</strong> {srdPosition.previousAveragePrice}</p>
            <p><strong>Poids (%):</strong> {srdPosition.weight}%</p>
            <p><strong>Liquidation:</strong> {srdPosition.liquidation}</p>
            <p><strong>Emprunt:</strong> {srdPosition.borrowing}</p>
          </div>
        ))}
      </div>

      <h2 className='highlighted-title m20'>Ordres</h2>
      <div className="row m20">
        {orders.map((order) => (
          <div className="col-sm-6 col-xs-10" key={order.id}>
            <div className="panel-heading">{order.positionId}</div>
            <p><strong>Type:</strong> {order.type}</p>
            <p><strong>Quantités:</strong> {order.quantity}</p>
            <p><strong>Cours:</strong> {order.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PositionsTable;