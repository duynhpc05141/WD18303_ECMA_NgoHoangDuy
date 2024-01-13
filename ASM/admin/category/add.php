<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
</head>

<body>
  <style>
    .row {
      width: 400px;
    }

    label.error {
      color: red;
    }
  </style>
  <div class="alert alert-light shadow text-center " role="alert">
    <h4>Thêm danh mục</h4>
  </div>
  <div class="container d-flex justify-content-center">

    <div class="row ">
      <form id="form-category" action="index.php?act=category_add" class="row g-3 mx-auto shadow p-3" method="post">
        <div class="col-md-12">
          <label for="validationCustom02" class="form-label">Tên loại</label>
          <input type="text" class="form-control" id="validationCustom02" required name="name">
        </div>
        <div class="col-12">
          <input class="btn btn-primary" type="submit" value="Thêm mới" name="add"></input>
          <input class="btn btn-primary" type="reset" value="Nhập lại"></input>
          <a href="index.php?act=category_list"> <input class="btn btn-primary" type="button"
              value="Danh sách"></input></a>
        </div>
        <?php
        if (!empty($alert)) {
          echo $alert; // Hiển thị thông báo thành công nếu có giá trị
        }

        ?>
      </form>

    </div>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
    crossorigin="anonymous"></script>
  <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
    integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4"
    crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/jquery.validate.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/additional-methods.min.js"></script>
  <script>
    $(document).ready(function () {
      $("#form-category").validate({
        rules: {
          name: "required",
        },
        messages: {
          name: "Vui lòng nhập tên danh mục",
        },
        // Xử lý khi biểu mẫu được gửi đi
        submitHandler: function (form) {
          form.submit();
        }
      });
    });
  </script>
</body>

</html>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>