import React, { useState } from 'react';
import {
  BriefcaseMedical,
  Building2,
  Syringe,
  Activity,
  Receipt,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Bed,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { useHospital } from '../../context/HospitalContext';
import { PieChartWidget } from '../charts/PieChartWidget';
import { servicesByCategoryData } from '../../data/mockData';

export const ServicesView = () => {
  const {
    servicesSubTab,
    navigateTo,
    departments,
    treatments,
    facilities,
    charges,
    showToast
  } = useHospital();

  const [chargeSearch, setChargeSearch] = useState('');
  const [selectedChargeCat, setSelectedChargeCat] = useState('All');

  // Inline state for "Add New Service"
  const [newServiceForm, setNewServiceForm] = useState({
    name: '',
    category: 'Cardiology',
    duration: '45 mins',
    prep: 'Routine pre-op vitals check',
    standardRate: 50000
  });

  const handleCreateService = (e) => {
    e.preventDefault();
    if (!newServiceForm.name) return;
    showToast(`New service "${newServiceForm.name}" registered in hospital tariff catalog.`);
    setNewServiceForm({
      name: '',
      category: 'Cardiology',
      duration: '45 mins',
      prep: 'Routine pre-op vitals check',
      standardRate: 50000
    });
    navigateTo('services', 'departments');
  };

  const filteredCharges = charges.filter((c) => {
    const matchesSearch = c.service.toLowerCase().includes(chargeSearch.toLowerCase()) || c.code.toLowerCase().includes(chargeSearch.toLowerCase());
    const matchesCat = selectedChargeCat === 'All' ? true : c.category.toLowerCase() === selectedChargeCat.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="view-container services-view">
      {/* Header */}
      <div className="view-header">
        <div>
          <h2 className="view-title">
            {servicesSubTab === 'departments' && 'All Hospital Services & Departments'}
            {servicesSubTab === 'treatments' && 'Add New Service & Surgical Procedures'}
            {servicesSubTab === 'facilities' && 'Specialized Hospital Facilities'}
            {servicesSubTab === 'charges' && 'Service Categories & Tariff Schedule (₦)'}
          </h2>
          <p className="view-description">
            {servicesSubTab === 'departments' && 'Clinical specialty wings, departmental leadership, and inpatient capacities'}
            {servicesSubTab === 'treatments' && 'Catalog of surgeries, diagnostic procedures, and new service definitions'}
            {servicesSubTab === 'facilities' && 'Intensive care, digital radiology, operation theaters, and blood bank status'}
            {servicesSubTab === 'charges' && 'Approved medical billing tariffs in Nigerian Naira (₦) with insurance coverage rules'}
          </p>
        </div>
      </div>

      {/* Tab 1: Departments Table (All Services) + Pie Chart for Services by Category */}
      {servicesSubTab === 'departments' && (
        <div className="space-y-4">
          <div className="content-card">
            <div className="card-header-bar">
              <div className="card-header-title">
                <BriefcaseMedical size={18} className="text-teal" />
                <div>
                  <h3>Services by Category</h3>
                  <p className="card-subtext">Catalog distribution across hospital clinical service divisions</p>
                </div>
              </div>
            </div>
            <div className="p-3">
              <PieChartWidget
                data={servicesByCategoryData}
                centerTitle="85"
                centerSubtitle="Services"
              />
            </div>
          </div>

          <div className="content-card">
            <div className="card-header-bar">
              <div className="card-header-title">
                <Building2 size={18} className="text-teal" />
                <div>
                  <h3>Clinical Departments Directory</h3>
                  <p className="card-subtext">Specialized wings, clinical leadership, and inpatient capacities</p>
                </div>
              </div>
              <span className="badge badge-teal">8 Operational Divisions</span>
            </div>

            <div className="table-responsive">
              <table className="naira-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Department Name</th>
                    <th>Head of Department</th>
                    <th className="text-center">Physicians</th>
                    <th className="text-center">Beds</th>
                    <th className="text-center">Inpatients</th>
                    <th>Operational Status</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.map((d) => (
                    <tr key={d.id}>
                      <td className="font-mono text-teal font-bold">{d.code}</td>
                      <td>
                        <strong>{d.name}</strong>
                      </td>
                      <td>{d.head}</td>
                      <td className="text-center font-bold">{d.doctorsCount}</td>
                      <td className="text-center font-bold">{d.bedsCount}</td>
                      <td className="text-center font-bold text-teal">{d.activeCases}</td>
                      <td>
                        <span className="badge badge-success flex items-center gap-1 w-max">
                          <CheckCircle2 size={13} /> {d.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Treatments & Procedures / Add New Service */}
      {servicesSubTab === 'treatments' && (
        <div className="space-y-4">
          <div className="content-card max-w-4xl mx-auto p-4 mb-4">
            <div className="card-header-bar mb-3">
              <div className="card-header-title">
                <Plus size={20} className="text-teal" />
                <div>
                  <h3>Add New Hospital Service / Procedure</h3>
                  <p className="card-subtext">Register a new clinical procedure or diagnostic test in the hospital system</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleCreateService} className="form-grid">
              <div className="form-group col-span-2">
                <label>Service / Procedure Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 24-Hour Ambulatory Blood Pressure Monitoring"
                  value={newServiceForm.name}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, name: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Department Category *</label>
                <select
                  value={newServiceForm.category}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, category: e.target.value })}
                  className="form-control"
                >
                  <option value="Cardiology">Cardiology</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Obstetrics">Obstetrics</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Surgical">Surgical</option>
                  <option value="Laboratory">Laboratory</option>
                </select>
              </div>

              <div className="form-group">
                <label>Standard Duration</label>
                <input
                  type="text"
                  placeholder="e.g. 60 mins"
                  value={newServiceForm.duration}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, duration: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Clinical Preparation Instructions</label>
                <input
                  type="text"
                  placeholder="e.g. Fasting 6 hours prior"
                  value={newServiceForm.prep}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, prep: e.target.value })}
                  className="form-control"
                />
              </div>

              <div className="form-group">
                <label>Standard Tariff in ₦ *</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="1000"
                  placeholder="45000"
                  value={newServiceForm.standardRate}
                  onChange={(e) => setNewServiceForm({ ...newServiceForm, standardRate: parseInt(e.target.value, 10) || 0 })}
                  className="form-control"
                />
              </div>

              <div className="col-span-2 flex justify-end gap-3 mt-3">
                <button type="submit" className="btn btn-teal-primary">
                  Save New Service
                </button>
              </div>
            </form>
          </div>

          <div className="content-card">
            <div className="card-header-bar">
              <div className="card-header-title">
                <Syringe size={18} className="text-teal" />
                <div>
                  <h3>Existing Treatments & Surgical Procedures</h3>
                  <p className="card-subtext">Clinical duration, pre-operative protocols, and tariff rates</p>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="naira-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Procedure Name</th>
                    <th>Department / Category</th>
                    <th>Average Duration</th>
                    <th>Pre-Op / Clinical Prep</th>
                    <th className="text-right">Standard Tariff (₦)</th>
                  </tr>
                </thead>
                <tbody>
                  {treatments.map((t) => (
                    <tr key={t.id}>
                      <td className="font-mono text-teal font-bold">{t.id}</td>
                      <td>
                        <strong>{t.name}</strong>
                      </td>
                      <td>
                        <span className="badge badge-dept">{t.category}</span>
                      </td>
                      <td className="font-mono text-sm">
                        <Clock size={13} className="inline mr-1 text-teal" /> {t.duration}
                      </td>
                      <td className="text-sm text-muted">{t.prep}</td>
                      <td className="text-right font-mono font-bold text-navy">
                        ₦{t.standardRate.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Hospital Facilities */}
      {servicesSubTab === 'facilities' && (
        <div className="facilities-grid">
          {facilities.map((fac, idx) => (
            <div key={idx} className="content-card facility-card">
              <div className="facility-card-header">
                <div className="facility-icon-wrap">
                  <Activity size={22} className="text-teal" />
                </div>
                <span className="status-pill pill-confirmed">{fac.status}</span>
              </div>
              <h3 className="facility-title">{fac.name}</h3>

              <div className="facility-metrics mt-3">
                <div className="metric-row">
                  <span className="text-muted">Total Capacity:</span>
                  <strong>{fac.capacity}</strong>
                </div>
                <div className="metric-row">
                  <span className="text-muted">Current Load:</span>
                  <strong className="text-teal">{fac.occupied}</strong>
                </div>
              </div>

              <div className="facility-highlight-strip mt-3">
                <ShieldCheck size={14} className="text-emerald" />
                <span>{fac.highlight}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Treatment Charges (Service Categories) */}
      {servicesSubTab === 'charges' && (
        <div className="content-card">
          <div className="card-header-bar">
            <div className="card-header-title">
              <Receipt size={18} className="text-teal" />
              <div>
                <h3>Official Hospital Treatment Tariff (Nigerian Naira ₦)</h3>
                <p className="card-subtext">Approved pricing schedule across consultations, diagnostics, and surgical interventions</p>
              </div>
            </div>
          </div>

          <div className="table-filter-bar">
            <div className="search-box">
              <Search size={16} className="text-muted" />
              <input
                type="text"
                placeholder="Search charge by service or code..."
                value={chargeSearch}
                onChange={(e) => setChargeSearch(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <Filter size={16} className="text-muted" />
              <span className="filter-label">Category:</span>
              {['All', 'Consultation', 'Inpatient', 'Laboratory', 'Radiology', 'Surgical'].map((c) => (
                <button
                  key={c}
                  className={`filter-chip ${selectedChargeCat === c ? 'active' : ''}`}
                  onClick={() => setSelectedChargeCat(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="table-responsive">
            <table className="naira-table">
              <thead>
                <tr>
                  <th>Service Code</th>
                  <th>Service Description</th>
                  <th>Category</th>
                  <th>HMO / Insurance Coverage</th>
                  <th className="text-right">Standard Tariff (₦)</th>
                </tr>
              </thead>
              <tbody>
                {filteredCharges.map((c) => (
                  <tr key={c.code}>
                    <td className="font-mono text-teal font-bold">{c.code}</td>
                    <td>
                      <strong>{c.service}</strong>
                    </td>
                    <td>
                      <span className="badge badge-dept">{c.category}</span>
                    </td>
                    <td>
                      <span className="badge badge-info">{c.hmoCovered}</span>
                    </td>
                    <td className="text-right font-mono font-bold text-teal text-base">
                      ₦{c.fee.toLocaleString()}
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
