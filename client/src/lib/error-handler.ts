import { revalidatePath } from "next/cache";

interface ActionResponse {
  success: boolean;
  message: string;
}

interface ActionOptions {
  path: string;
  entityName: string;
  identifier: string | number;
  action: "create" | "update" | "delete";
}

export async function handleAction<T>(
  operation: () => Promise<T>,
  options: ActionOptions
): Promise<ActionResponse> {
  try {
    await operation();
    revalidatePath(options.path);
    
    const messages = {
      create: `creado`,
      update: `actualizado`,
      delete: `eliminado`,
    };

    return {
      success: true,
      message: `${options.entityName} "${options.identifier}" ${messages[options.action]} exitosamente!`,
    };
  } catch (error: any) {
    const isDuplicate = error.message.includes("Duplicate");
    const isForeignKeyViolation = error.message.includes("ForeignKeyViolationError");

    if (isDuplicate) {
      return {
        success: false,
        message: `El ${options.entityName.toLowerCase()} "${options.identifier}" ya existe`,
      };
    }

    if (isForeignKeyViolation) {
      return {
        success: false,
        message: `El ${options.entityName.toLowerCase()} tiene recursos asociados`,
      };
    }

    return {
      success: false,
      message: `Error al ${options.action}r el ${options.entityName.toLowerCase()}`,
    };
  }
} 