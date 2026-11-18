import React, { useState } from 'react';
import {
  Package,
  Pill,
  Wrench,
  AlertTriangle,
  ShoppingCart,
  Search,
  Plus,
  Minus,
  CheckCircle2,
  Clock,
  RotateCcw,
  Sliders,
  DollarSign
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';

export const InventoryView = () => {
  const {
    medicines,
    equipment,
    purchaseRecords,
    inventorySubTab,
    navigateTo,
    setSelectedMedicine,
    setIsStockModalOpen,
    reorderMedicine,
    showToast
  } = useHospital();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const lowStockItems = medicines.filter((m) => m.status.includes('Low') || m.status.includes('Critical'));

  const filteredMedicines = medicines.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat =
      selectedCategory === 'All' ? true : m.category.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCat;
  });

  const handleOpenStockAdjust = (med) => {
    setSelectedMedicine(med);
    setIsStockModalOpen(true);
  };

  return (
    <div className="view-container inventory-view">
      {/* Header */}
      <div className="view-header">
        <div>
          <h2 className="view-title">
            {inventorySubTab === 'medicines' && 'Medicine Stock & Pharmacy Dispensary'}
            {inventorySubTab === 'equipment' && 'Biomedical Equipment & Diagnostic Machinery'}
            {inventorySubTab === 'stockMgmt' && 'Stock Level Management & Batch Adjustments'}
            {inventorySubTab === 'lowStock' && 'Critical Low Stock Threshold Alerts'}
            {inventorySubTab === 'purchases' && 'Vendor Purchase Orders & Restock Ledger'}
          </h2>
          <p className="view-description">
            {inventorySubTab === 'medicines' && 'Active pharmaceutical stock quantities, dosage units, expiry dates, and unit tariffs (₦)'}
            {inventorySubTab === 'equipment' && 'Critical care ventilators, monitors, CT scanners, and preventative maintenance certifications'}
            {inventorySubTab === 'stockMgmt' && 'Record stock receipts from licensed manufacturers and hospital ward dispensations'}
            {inventorySubTab === 'lowStock' && 'Automated safety stock warnings and immediate batch reordering triggers'}
            {inventorySubTab === 'purchases' && 'Approved drug procurement purchase orders and supplier delivery status tracking'}
          </p>
        </div>
        <div className="view-actions">
          <button
            className="btn btn-teal-primary"
            onClick={() => handleOpenStockAdjust(medicines[0])}
          >
            <Sliders size={16} /> Adjust Stock
          </button>
        </div>
      </div>

      {/* Critical Low Stock Warning Strip (Shown on medicine or lowStock tab) */}
      {lowStockItems.length > 0 && inventorySubTab !== 'lowStock' && (
        <div className="low-stock-alert-strip mb-4">
          <div className="alert-strip-left">
            <AlertTriangle size={20} className="text-amber" />
            <div>
              <strong>Low Pharmacy Stock Warning:</strong> {lowStockItems.length} essential pharmaceuticals are below safe reorder thresholds.
            </div>
          </div>
          <button
            className="btn btn-outline-amber btn-sm"
            onClick={() => navigateTo('inventory', 'lowStock')}
          >
            Review & Auto-Reorder →
          </button>
        </div>
      )}

      {/* Tab 1: Medicine Stock Table */}
      {inventorySubTab === 'medicines' && (
        <div className="content-card">
          <div className="table-filter-bar">
            <div className="search-box">
              <Search size={16} className="text-muted" />
              <input
                type="text"
                placeholder="Search medication name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <span className="filter-label">Category:</span>
              {['All', 'Antibiotics', 'Analgesics', 'Antimalarial', 'Endocrinology', 'IV Fluids'].map((cat) => (
                <button
                  key={cat}
                  className={`filter-chip ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="table-responsive">
            <table className="naira-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Medication Name</th>
                  <th>Category</th>
                  <th>Dosage Form</th>
                  <th className="text-center">Stock Level</th>
                  <th className="text-center">Reorder At</th>
                  <th>Expiry Date</th>
                  <th className="text-right">Unit Tariff (₦)</th>
                  <th>Status</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredMedicines.map((med) => (
                  <tr key={med.id}>
                    <td className="font-mono text-teal font-bold">{med.id}</td>
                    <td>
                      <strong>{med.name}</strong>
                    </td>
                    <td>
                      <span className="badge badge-dept">{med.category}</span>
                    </td>
                    <td>{med.dosageForm}</td>
                    <td className="text-center font-mono font-bold text-base">
                      <span className={med.stock <= med.reorderLevel ? 'text-rose' : 'text-teal'}>
                        {med.stock} Units
                      </span>
                    </td>
                    <td className="text-center font-mono text-muted">{med.reorderLevel}</td>
                    <td className="font-mono text-sm">{med.expiry}</td>
                    <td className="text-right font-mono font-bold text-navy">
                      ₦{med.unitPrice.toLocaleString()}
                    </td>
                    <td>
                      <span
                        className={`status-pill ${
                          med.status === 'In Stock'
                            ? 'pill-confirmed'
                            : med.status === 'Critical Low'
                            ? 'pill-cancelled'
                            : 'pill-pending'
                        }`}
                      >
                        {med.status}
                      </span>
                    </td>
                    <td className="text-right">
                      <button
                        className="btn btn-outline-teal btn-sm"
                        onClick={() => handleOpenStockAdjust(med)}
                      >
                        Adjust
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 2: Medical Equipment */}
      {inventorySubTab === 'equipment' && (
        <div className="content-card">
          <div className="card-header-bar">
            <div className="card-header-title">
              <Wrench size={18} className="text-teal" />
              <div>
                <h3>Biomedical Machinery & Diagnostic Hardware</h3>
                <p className="card-subtext">Preventative calibration schedules, serial tracking, and operational certifications</p>
              </div>
            </div>
            <span className="badge badge-success">6 Major Systems Online</span>
          </div>

          <div className="table-responsive">
            <table className="naira-table">
              <thead>
                <tr>
                  <th>Asset ID</th>
                  <th>Equipment Description</th>
                  <th>Model / Specs</th>
                  <th>Department</th>
                  <th>Serial Number</th>
                  <th>Last Serviced</th>
                  <th>Next Calibration</th>
                  <th>Operational Status</th>
                </tr>
              </thead>
              <tbody>
                {equipment.map((eq) => (
                  <tr key={eq.id}>
                    <td className="font-mono text-teal font-bold">{eq.id}</td>
                    <td>
                      <strong>{eq.name}</strong>
                    </td>
                    <td className="text-sm text-muted">{eq.model}</td>
                    <td>
                      <span className="badge badge-dept">{eq.department}</span>
                    </td>
                    <td className="font-mono text-xs">{eq.serialNo}</td>
                    <td className="font-mono text-sm">{eq.lastService}</td>
                    <td className="font-mono text-sm font-bold text-navy">{eq.nextService}</td>
                    <td>
                      <span
                        className={`badge ${
                          eq.status === 'Operational' ? 'badge-success' : 'badge-warning'
                        }`}
                      >
                        {eq.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Stock Management */}
      {inventorySubTab === 'stockMgmt' && (
        <div className="space-y-4">
          <div className="content-card p-4">
            <div className="card-header-bar mb-3">
              <div className="card-header-title">
                <Sliders size={20} className="text-teal" />
                <div>
                  <h3>Pharmacy Stock Management</h3>
                  <p className="card-subtext">Select an item below to quickly add received batch or deduct dispensed doses</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {medicines.map((med) => (
                <div key={med.id} className="p-3 border rounded-md bg-white hover:border-teal transition-all flex justify-between items-center">
                  <div>
                    <div className="font-bold text-navy text-sm">{med.name}</div>
                    <div className="text-xs text-muted">{med.category} • {med.dosageForm}</div>
                    <div className="font-mono text-teal text-sm mt-1">{med.stock} Units Available</div>
                  </div>
                  <button
                    className="btn btn-outline-teal btn-sm"
                    onClick={() => handleOpenStockAdjust(med)}
                  >
                    Adjust
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Low Stock Alerts */}
      {inventorySubTab === 'lowStock' && (
        <div className="content-card">
          <div className="card-header-bar">
            <div className="card-header-title">
              <AlertTriangle size={18} className="text-amber" />
              <div>
                <h3>Critical Low Stock Threshold Alerts</h3>
                <p className="card-subtext">Automated replenishment trigger to prevent hospital pharmaceutical stockouts</p>
              </div>
            </div>
            <span className="badge badge-warning">{lowStockItems.length} Urgent Items</span>
          </div>

          <div className="table-responsive">
            <table className="naira-table">
              <thead>
                <tr>
                  <th>Medication</th>
                  <th>Category</th>
                  <th className="text-center">Current Stock</th>
                  <th className="text-center">Safe Minimum</th>
                  <th>Expiry Date</th>
                  <th>Estimated Cost (x100)</th>
                  <th className="text-right">Instant Action</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map((med) => (
                  <tr key={med.id}>
                    <td>
                      <strong>{med.name}</strong>
                      <div className="text-xs text-muted">{med.dosageForm}</div>
                    </td>
                    <td>
                      <span className="badge badge-dept">{med.category}</span>
                    </td>
                    <td className="text-center font-mono font-bold text-rose text-base">
                      {med.stock} Units
                    </td>
                    <td className="text-center font-mono text-muted">{med.reorderLevel} Units</td>
                    <td className="font-mono text-sm">{med.expiry}</td>
                    <td className="font-mono font-bold text-navy">
                      ₦{(med.unitPrice * 100).toLocaleString()}
                    </td>
                    <td className="text-right">
                      <button
                        className="btn btn-teal-primary btn-sm"
                        onClick={() => reorderMedicine(med)}
                      >
                        <ShoppingCart size={14} /> Create Re-Order PO
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: Purchase Records */}
      {inventorySubTab === 'purchases' && (
        <div className="content-card">
          <div className="card-header-bar">
            <div className="card-header-title">
              <ShoppingCart size={18} className="text-teal" />
              <div>
                <h3>Pharmaceutical Purchase Orders & Vendor Records</h3>
                <p className="card-subtext">Approved procurement orders with Nigerian licensed drug manufacturers</p>
              </div>
            </div>
            <span className="badge badge-teal">Audited Procurements</span>
          </div>

          <div className="table-responsive">
            <table className="naira-table">
              <thead>
                <tr>
                  <th>PO Number</th>
                  <th>Manufacturer / Vendor</th>
                  <th>PO Date</th>
                  <th>Consignment Summary</th>
                  <th>Delivery Status</th>
                  <th className="text-right">Total Invoice (₦)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {purchaseRecords.map((po) => (
                  <tr key={po.poNumber}>
                    <td className="font-mono text-teal font-bold">{po.poNumber}</td>
                    <td>
                      <strong>{po.supplier}</strong>
                    </td>
                    <td className="font-mono text-sm">{po.date}</td>
                    <td className="text-sm">{po.itemsSummary}</td>
                    <td className="text-sm font-bold text-navy">{po.deliveryDate}</td>
                    <td className="text-right font-mono font-bold text-teal">
                      ₦{po.amount.toLocaleString()}
                    </td>
                    <td>
                      <span
                        className={`status-pill ${
                          po.status === 'Delivered'
                            ? 'pill-confirmed'
                            : po.status === 'In Transit'
                            ? 'pill-pending'
                            : 'pill-partial'
                        }`}
                      >
                        {po.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
