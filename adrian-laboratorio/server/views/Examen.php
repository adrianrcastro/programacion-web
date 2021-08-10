<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <style>
        %style%
    </style>
</head>
<body>
<div class="container mt-2">
    <header>
        <h3>Documento : %codigo_examen%pub</h3>
    </header>
    <em>Sr. %cliente_nombre%, aqui tiene los resultado de su examen <strong>%nombre_examen% .</strong></em>
    <br><br><br>
    <table class="table">
        <thead class="bg-dark text-white p-2">
            <tr>
                <th>Nombre</th>
                <th>Descripcion</th>
                <th>Resultados</th>
            </tr>
        </thead>
        <tbody class="p-2">
            <tr>
                <td>%nombre_examen%</td>
                <td>%descripcion_examen%</td>
                <td>%resultados_examen%</td>
            </tr>
        </tbody>
    </table>
    <br>
    <a href="%link%">Descargar pdf en linea</a>
</div>
</body>
</html>
