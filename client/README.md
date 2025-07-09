This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## PEQUEÑA GUÍA DE DESARROLLO
  1. Crear un model con TYPEORM. Luego crear el DTO y la función de mapeo de datos.
  2. Agregar e model a lib/database.ts en el array de entidades para su mapeo.
  3. En modules crear action para el model (CRUD y más).
  4. La vista siempre tiene que ser server.
  5. El resto de componentes de la vista puede ser server o client.
  6. Use los componentes personalizados.
  7. Cree la página en app para las rutas.
  8. Agregue o actualiza la ruta en el sidebar. (El sidebar es estático)