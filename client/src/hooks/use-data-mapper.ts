import { useCallback, useState } from 'react';
import { buscarExacto, getData } from '@/service/data.actions';

interface DataMapperOptions {
    dataAttributes: string[];      // Array de nombres de atributos de la data original
    tableNames: string[];         // Array de nombres de tablas (tipos)
    tableAttributes: string[];    // Array de atributos de las tablas para comparar
    conditionalAttributes: { numeroTabla: number, atributo: string, valor: string }[];    // Array de atributos condicionales
}

interface UseDataMapperReturn {
    mapDataWithDescriptions: (data: any[], options: DataMapperOptions) => Promise<any[]>;
    isLoading: boolean;
    error: string | null;
}

/**
 * Hook personalizado para mapear datos con descripciones de tablas de tipos
 * 
 * @returns {UseDataMappersReturn} Objeto con la función de mapeo y estados
 * 
 * @example
 * const { mapDataWithDescriptions, isLoading, error } = useDataMapper();
 * 
 * const dataMapeada = await mapDataWithDescriptions(dataOriginal, {
 *   dataAttributes: ['tiposervicio', 'estadoservicio'],
 *   tableNames: ['tiposervicio', 'estadoservicio'],
 *   tableAttributes: ['codigo', 'codigo']
 * });
 */
export const useDataMapper = (): UseDataMapperReturn => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    /**
     * Mapea los datos reemplazando códigos con descripciones
     */
    const mapDataWithDescriptions = useCallback(async (
        data: any[],
        options: DataMapperOptions
    ): Promise<any[]> => {
        const { dataAttributes, tableNames, tableAttributes, conditionalAttributes } = options;

        try {
            setIsLoading(true);
            setError(null);

            // Validaciones
            if (!Array.isArray(data) || data.length === 0) {
                throw new Error('Los datos deben ser un array no vacío');
            }

            if (dataAttributes.length !== tableNames.length || tableNames.length !== tableAttributes.length) {
                throw new Error('Los arrays dataAttributes, tableNames y tableAttributes deben tener la misma longitud');
            }

            const tableDataPromises = tableNames.map(async (tableName, index) => {
                // Buscar si el índice actual está en conditionalAttributes
                const conditionalAttr = conditionalAttributes.find(item => item.numeroTabla === index);

                return conditionalAttr
                    ? await buscarExacto(tableName, [conditionalAttr.atributo], [conditionalAttr.valor])
                    : await getData(tableName);
            });

            const tableDataResults = await Promise.all(tableDataPromises);

            // Verificar que todas las consultas fueron exitosas
            const failedRequests = tableDataResults.filter(result => !result.success);
            if (failedRequests.length > 0) {
                const errorMessages = failedRequests.map(result => result.message).join(', ');
                throw new Error(`Error al obtener datos de tablas: ${errorMessages}`);
            }

            // Crear un mapa de códigos a descripciones para cada tabla
            const codeToDescriptionMaps = tableDataResults.map((result, index) => {
                const tableData = result.data;
                const tableAttribute = tableAttributes[index];

                const map = new Map();

                tableData.forEach((item: any) => {
                    const code = item[tableAttribute];
                    const description = item.descripcion;

                    if (code !== undefined && description !== undefined) {
                        map.set(code.toString(), description);
                    }
                });

                return map;
            });

            // Mapear los datos originales
            const mappedData = data.map(item => {
                const mappedItem = { ...item };

                dataAttributes.forEach((dataAttribute, index) => {
                    const codeToDescriptionMap = codeToDescriptionMaps[index];
                    const originalValue = item[dataAttribute];

                    if (originalValue !== undefined && originalValue !== null) {
                        const description = codeToDescriptionMap.get(originalValue.toString());
                        if (description !== undefined) {
                            mappedItem[dataAttribute] = description;
                        }
                    }
                });

                return mappedItem;
            });

            return mappedData;

        } catch (err: any) {
            const errorMessage = err.message || 'Error desconocido al mapear datos';
            setError(errorMessage);
            console.error('Error en useDataMapper:', err);
            throw err;
        } finally {
            setIsLoading(false);
        }
    }, []);

    return {
        mapDataWithDescriptions,
        isLoading,
        error
    };
};

export default useDataMapper; 