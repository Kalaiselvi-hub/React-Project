import React, { useState } from 'react';
import { X, Package, Plus, Minus } from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const AdjustStockModal = () => {
  const { selectedMedicine, isStockModalOpen, setIsStockModalOpen, adjustStock } = useHospital();

  const [quantity, setQuantity] = useState(10);
  const [actionType, setActionType] = useState('add'); // 'add' or 'subtract'
  const [reason, setReason] = useState('Batch Delivery from Supplier');

  if (!isStockModalOpen || !selectedMedicine) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const qty = parseInt(quantity, 10) || 0;
    const delta = actionType === 'add' ? qty : -qty;
    adjustStock(selectedMedicine.id, delta, reason);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-box modal-md animate-scaleIn">
        <div className="modal-header">
          <div className="modal-title-wrap">
            <Package size={20} className="text-teal" />
            <h3 className="modal-title">Adjust Pharmacy Stock</h3>
          </div>
          <button className="modal-close-btn" onClick={() => setIsStockModalOpen(false)}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-body">
          <div className="stock-info-card mb-3">
            <div className="medicine-name-title">{selectedMedicine.name}</div>
            <div className="stock-meta-row">
              <span>Category: <strong>{selectedMedicine.category}</strong></span>
              <span>Current Stock: <strong className="font-mono text-teal">{selectedMedicine.stock} Units</strong></span>
              <span>Reorder Alert at: {selectedMedicine.reorderLevel}</span>
            </div>
          </div>

          <div className="form-group mb-3">
            <label>Adjustment Type</label>
            <div className="btn-group-toggle">
              <button
                type="button"
                className={`btn-toggle ${actionType === 'add' ? 'active add' : ''}`}
                onClick={() => setActionType('add')}
              >
                <Plus size={16} /> Add Received Stock (+)
              </button>
              <button
                type="button"
                className={`btn-toggle ${actionType === 'subtract' ? 'active sub' : ''}`}
                onClick={() => setActionType('subtract')}
              >
                <Minus size={16} /> Dispense / Deduct (-)
              </button>
            </div>
          </div>

          <div className="form-group mb-3">
            <label>Units to {actionType === 'add' ? 'Add' : 'Deduct'} *</label>
            <input
              type="number"
              min="1"
              required
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group mb-3">
            <label>Reason for Adjustment</label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="form-control"
            >
              <option value="Batch Delivery from Supplier">Batch Delivery from Supplier</option>
              <option value="Dispensed to Inpatient Ward">Dispensed to Inpatient Ward</option>
              <option value="Damaged / Broken Vial">Damaged / Broken Vial</option>
              <option value="Routine Audit Reconciliation">Routine Audit Reconciliation</option>
              <option value="Emergency Restock">Emergency Restock</option>
            </select>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setIsStockModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-teal-primary">
              Confirm Stock Change
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
