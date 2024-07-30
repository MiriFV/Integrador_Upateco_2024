

Formato de recetas obtenidos por la API
Recipe{
id	integer
title: ID
readOnly: true
created_at	string($date-time)
title: Fecha de creación
readOnly: true
updated_at	string($date-time)
title: Fecha de actualización
readOnly: true
title*	string
title: Título
maxLength: 255
minLength: 1
description	string
title: Descripción
x-nullable: true
preparation_time*	integer
title: Tiempo de preparación (minutos)
maximum: 2147483647
minimum: 0
cooking_time*	integer
title: Tiempo de cocción (minutos)
maximum: 2147483647
minimum: 0
servings	integer
title: Porciones
maximum: 2147483647
minimum: 0
x-nullable: true
image	string($uri)
title: Imagen
readOnly: true
x-nullable: true
view_count	integer
title: Cantidad de vistas
readOnly: true
owner	integer
title: Owner
readOnly: true
ingredients	[
readOnly: true
uniqueItems: true
Ingredientesinteger
title: Ingredientes]
locations	[
readOnly: true
uniqueItems: true
Ubicacionesinteger
title: Ubicaciones]
categories	[
readOnly: true
uniqueItems: true
Categoríasinteger
title: Categorías]
 
}