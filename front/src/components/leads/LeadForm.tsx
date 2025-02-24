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
import { programs } from "@/data/programs"; // Importamos la lista de programas

interface LeadFormValues {
    first_name: string;
    last_name: string;
    estudio: string;
    sede: string;
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

            {/* Estudio */}
            <div>
                <label className="block text-sm font-medium">Estudio</label>
                <Input 
                    {...register("estudio", { 
                        required: "El estudio es obligatorio",
                        minLength: { value: 3, message: "Debe tener al menos 3 caracteres" },
                        pattern: { value: /^[A-Za-z\s]+$/, message: "Solo se permiten letras y espacios" },
                        validate: (value) => value.trim().length > 0 || "No puede ser solo espacios"
                    })} 
                 />
                {errors.estudio && <p className="text-red-500 text-sm">{errors.estudio.message}</p>}
            </div>

            {/* Sede */}
            <div>
                <label className="block text-sm font-medium">Sede</label>
                <Input 
                    {...register("sede", { 
                        required: "La sede es obligatoria",
                        pattern: { value: /^[A-Za-z\s]+$/, message: "Solo se permiten letras y espacios" },
                        validate: (value) => value.trim().length > 0 || "No puede ser solo espacios"
                        })} 
                />
                {errors.sede && <p className="text-red-500 text-sm">{errors.sede.message}</p>}
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


