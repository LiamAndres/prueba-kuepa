/* 
Formulario reutilizable.
los inputs, validaciones y lógica de React Hook Form


Reutilizare components/ui/input.tsx, 
components/ui/select.tsx, components/ui/button.tsx en lugar de 
crear nuestros propios inputs y botones.
*/
import { useForm, Controller } from "react-hook-form";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "../ui/select";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";

interface LeadFormValues {
    first_name: string;
    last_name: string;
    email: string;
    mobile_phone: string;
    interestProgram: string;
    status: "active" | "inactive";
}

const LeadForm = ({ onSubmit }: { onSubmit: (data: LeadFormValues) => void }) => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LeadFormValues>();

    const [programs, setPrograms] = useState<{ _id: string; name: string }[]>([]);

    useEffect(() => {
        // Simulación de IDs de MongoDB para cada programa
        setPrograms([
            { _id: "65d48a72b45f1a001f4d9c30", name: "Técnico laboral en auxiliar administrativo" },
            { _id: "65d48a72b45f1a001f4d9c31", name: "Técnico laboral en mercadeo y ventas" },
            { _id: "65d48a72b45f1a001f4d9c32", name: "Técnico laboral en hotelería y turismo" },
            { _id: "65d48a72b45f1a001f4d9c33", name: "Técnico laboral en procesamiento y digitación de datos" },
            { _id: "65d48a72b45f1a001f4d9c34", name: "Técnico laboral en contabilidad y finanzas" },
            { _id: "65d48a72b45f1a001f4d9c35", name: "Bachillerato semipresencial (acelerado)" },
        ]);
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded-md shadow-md">
            {/* Nombre */}
            <div>
                <label className="block text-sm font-medium">Nombre</label>
                <Input {...register("first_name", { required: "El nombre es obligatorio" })} />
                {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name.message}</p>}
            </div>

            {/* Apellido */}
            <div>
                <label className="block text-sm font-medium">Apellido</label>
                <Input {...register("last_name", { required: "El apellido es obligatorio" })} />
                {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name.message}</p>}
            </div>

            {/* Correo Electrónico */}
            <div>
                <label className="block text-sm font-medium">Correo Electrónico</label>
                <Input
                    type="email"
                    {...register("email", {
                        required: "El correo es obligatorio",
                        pattern: { value: /\S+@\S+\.\S+/, message: "Correo inválido" },
                    })}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            {/* Teléfono */}
            <div>
                <label className="block text-sm font-medium">Teléfono</label>
                <Input
                    type="tel"
                    {...register("mobile_phone", {
                        required: "El teléfono es obligatorio",
                        pattern: { value: /^[0-9]{10}$/, message: "Debe tener exactamente 10 dígitos" },
                    })}
                    onInput={(e) => {
                        (e.target as HTMLInputElement).value = (e.target as HTMLInputElement).value.replace(/\D/g, "");
                    }}
                />
                {errors.mobile_phone && <p className="text-red-500 text-sm">{errors.mobile_phone.message}</p>}

            </div>

            {/* Programa de Interés - Select con Radix UI */}
            <div>
                <label className="block text-sm font-medium">Programa de Interés</label>
                <Controller
                    name="interestProgram"
                    control={control}
                    rules={{ required: "Selecciona un programa" }}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona..." />
                            </SelectTrigger>
                            <SelectContent>
                                {programs.map((program) => (
                                    <SelectItem key={program._id} value={program._id}>
                                        {program.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.interestProgram && <p className="text-red-500 text-sm">{errors.interestProgram.message}</p>}
            </div>

            {/* Estado del Lead - Select con Radix UI */}
            <div>
                <label className="block text-sm font-medium">Estado</label>
                <Controller
                    name="status"
                    control={control}
                    rules={{ required: "Selecciona un estado" }}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="active">Activo</SelectItem>
                                <SelectItem value="inactive">Inactivo</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>

            {/* Botón de Envío */}
            <Button type="submit" className="w-full bg-purple-600 text-white">
                Guardar
            </Button>
        </form>
    );
};

export default LeadForm;


