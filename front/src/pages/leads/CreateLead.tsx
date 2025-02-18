/* 
Pantalla donde se usa el formulario.
Aquí usamos <LeadForm /> y enviamos los datos al backend usando leadService.ts.
*/

import LeadForm from "../../components/leads/LeadForm";
import { useNavigate } from "react-router-dom";
import leadService from "../../services/leadService";

const CreateLeadPage = () => {
    const navigate = useNavigate();

    const handleCreateLead = async (data: any) => {
        try {
            await leadService.upsertLead(data);
            alert("Lead creado exitosamente");
            navigate("/leads"); // Redirigir después de guardar
        } catch (error: any) {
            if (error.response?.status === 409) {
                alert("Este lead ya existe en el sistema.");
            } else if (error.response?.status === 401) {
                alert("No tienes autorización. Inicia sesión nuevamente.");
            } else {
                alert("Hubo un error al guardar el lead. Inténtalo de nuevo.");
            }
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Crear Lead</h1>
            <LeadForm onSubmit={handleCreateLead} />
        </div>
    );
};

export default CreateLeadPage;
