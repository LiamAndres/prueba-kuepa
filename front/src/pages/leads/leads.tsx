import { app } from "@/atoms/kuepa"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom";
import leadService from "@/services/leadService";
import { programs } from "@/data/programs"; // Importamos la lista de programas

export interface LeadsProps {
}

export default function Leads(props?: LeadsProps) {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    app.set({
      ...(app.get() || {}),
      app: 'kuepa',
      module: 'leads',
      window: 'crm',
      back: null,
      accent: 'purple',
      breadcrumb: [
        {
          title: 'Leads',
          url: '/leads'
        }
      ]
    })

    // Obtener los leads desde leadService
    leadService
      .getAllLeads()
      .then((data) => setLeads(data.list))
      .catch((err) => setError(`Error al cargar leads: ${err.message}`));
  }, [])


  return (
    <div className="p-6">
      <h1 className="text-4xl font-title text-purple-800 mb-4">Leads</h1>
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded-md"
        onClick={() => navigate("/leads/create")}
      >
        + Nuevo Lead
      </button>

      {error ? (
        <p className="text-red-500 mt-4">{error}</p>
      ) : (
        <table className="mt-4 w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Nombre</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Teléfono</th>
              <th className="border border-gray-300 p-2">Programa</th>
              <th className="border border-gray-300 p-2">Estado</th>
              <th className="border border-gray-300 p-2">Fecha de Creación</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center p-4">
                  No hay leads registrados.
                </td>
              </tr>
            ) : (
              leads.map((lead) => {
                // Buscar el nombre del programa en la lista de programas
                const programName = programs.find((p) => p._id === lead.interestProgram)?.name || "N/A";

                return (
                  <tr key={lead._id} className="text-center">
                    <td className="border border-gray-300 p-2">{lead.first_name} {lead.last_name}</td>
                    <td className="border border-gray-300 p-2">{lead.email}</td>
                    <td className="border border-gray-300 p-2">{lead.mobile_phone}</td>
                    <td className="border border-gray-300 p-2">{programName}</td>
                    <td className="border border-gray-300 p-2">{lead.status}</td>
                    <td className="border border-gray-300 p-2">{new Date(lead.created_at).toLocaleDateString()}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}