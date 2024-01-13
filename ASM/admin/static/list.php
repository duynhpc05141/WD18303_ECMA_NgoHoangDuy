<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.0/xlsx.full.min.js"></script>

<style>
    .btn {
        margin: 0.5rem 0.5rem;
    }
</style>

<body>

    <div class="container ">
        <div class="alert alert-light shadow text-center " role="alert">
            <h4>Thống kê</h4>
        </div>
        <div class="row justify-content-center ">
            <div class="col-10">

                <table class="table table-bordered text-center table-hover " id="myTable" border="1">
                    <thead>
                        <tr>

                            <th scope="col">ID danh mục</th>
                            <th scope="col">Tên danh mục</th>
                            <th scope="col">Số lượng bài viết</th>


                        </tr>
                    </thead>
                    <tbody>
                        <?php

                        foreach ($listStatic as $static) {
                            extract($static);

                                 echo ' 
                                <tr>  
                                
                                <td>' . $idcategory . '</td>
                                <td>' . $namecategory . '</td>
                                <td>' . $countarticle . '</td>
                                
                                </tr>
                                ';
                        }

                        ?>

                    </tbody>

                    <a href="index.php?act=chart"><input class="btn btn-primary btn-sm" type="button" value="Xem biểu đồ"></a>
                    <button onclick="exportTableToExcel()" class="btn"><img src="../img/ex.png" alt="" width="50px"></button>

                    <button onclick="exportTableToCSV()" class="btn"><img src="../img/cs.png" alt="" width="40px"></button>
                </table>

            </div>
        </div>
    </div>


<script>
    function downloadCSV(csv, filename) {
        var csvFile;
        var downloadLink;

        csvFile = new Blob([csv], {
            type: "text/csv"
        });
        downloadLink = document.createElement("a");
        downloadLink.download = filename;
        downloadLink.href = window.URL.createObjectURL(csvFile);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
        downloadLink.click();
    }

    function exportTableToCSV() {
        var table = document.getElementById("myTable");
        var rows = table.querySelectorAll("tr");
        var csv = [];

        for (var i = 0; i < rows.length; i++) {
            var row = [],
                cols = rows[i].querySelectorAll("td, th");

            for (var j = 0; j < cols.length; j++)
                row.push(cols[j].innerText);

            csv.push(row.join(","));
        }

        var currentDate = new Date();
        var filename = "thongke_" + currentDate.toISOString().slice(0, 10) + ".csv";
        downloadCSV(csv.join("\n"), filename);
    }


    //Export Excel Table

    function exportTableToExcel() {
        var table = document.getElementById("myTable");
        var rows = table.querySelectorAll("tr");
        var data = [];

        for (var i = 0; i < rows.length; i++) {
            var cols = rows[i].querySelectorAll("td, th");
            var rowData = [];

            for (var j = 0; j < cols.length; j++) {
                rowData.push(cols[j].innerText);
            }

            data.push(rowData);
        }

        var ws = XLSX.utils.aoa_to_sheet(data);
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        var wbout = XLSX.write(wb, {
            bookType: "xlsx",
            type: "binary"
        });

        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
            return buf;
        }
        var blob = new Blob([s2ab(wbout)], {
            type: "application/octet-stream"
        });

        var currentDate = new Date();
        var filename = "thongke_" + currentDate.toISOString().slice(0, 10) + ".xlsx";
        if (navigator.msSaveBlob) {
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) {
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = "hidden";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }
</script>