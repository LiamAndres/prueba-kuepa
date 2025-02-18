import { app } from "@/atoms/kuepa"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom";

export interface LeadsProps {
}

export default function Leads(props?: LeadsProps) {
  const navigate = useNavigate();

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
    </div>
  )
}