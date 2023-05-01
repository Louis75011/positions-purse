import React from 'react';
import positionsData from '../services/data/purseData.json';
import { Position, SrdPosition, Order } from '../services/interfaces/Purse';
import "../App.scss"

const PositionsTable: React.FC = () => {
  const positions: Position[] = positionsData.positions.map((position) => ({
    id: position.id,
    name: position.name,
    ticker: position.ticker,
    isin: position.isin,
    quantity: position.quantity,
    price: position.price,
    previousPrice: position.previousPrice,
    valuation: position.valuation,
    previousValuation: position.previousValuation,
    averagePrice: position.averagePrice,
    previousAveragePrice: position.previousAveragePrice,
    averageCost: position.averageCost,
    previousAverageCost: position.previousAverageCost,
    weight: position.weight,
  }));

  const srdPositions: SrdPosition[] = positionsData.srdPositions.map((srdPosition) => ({
    id: srdPosition.id,
    name: srdPosition.name,
    ticker: srdPosition.ticker,
    isin: srdPosition.isin,
    quantity: srdPosition.quantity,
    price: srdPosition.price,
    previousPrice: srdPosition.previousPrice,
    valuation: srdPosition.valuation,
    previousValuation: srdPosition.previousValuation,
    averagePrice: srdPosition.averagePrice,
    previousAveragePrice: srdPosition.previousAveragePrice,
    averageCost: srdPosition.averageCost,
    previousAverageCost: srdPosition.previousAverageCost,
    weight: srdPosition.weight,
    borrowedAmount: srdPosition.borrowing,
    interestRate: srdPosition.liquidation,
  }));

  const orders: Order[] = positionsData.orders.map((order) => ({
    id: order.id,
    positionId: order.positionId,
    type: order.type,
    quantity: order.quantity,
    price: order.price,
  }));

  return (
    <div>

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