
  <style>
    label.error {
        color: red;
    }

</style>
  <div class="container">
    <?php
    if (is_array($article)) {
      extract($article);
    }
    
    ?>
    
    <div class="alert alert-light shadow text-center " role="alert">
      <h4>Cập nhật bài viết</h4>
    </div>

    <div class="row justify-content-center">
      <div class="col-12">
        <form id="article-form"  action="index.php?act=article-update" class="row g-3 product mx-auto shadow p-5" method="post" enctype="multipart/form-data">
          <div class="col-md-12">
            <label for="validationCustom02" class="form-label">Tên loại</label>
            <select name="category_id" class="form-select" style="height: 40px;">
            <option value="" selected >All</option>
              <?php
              $list_loai = loai_select_all();
              foreach ($list_loai as $row) {
                $selected = ($category_id == $row['category_id']) ? 'selected' : '';
              ?>
                <option value="<?= $row['category_id'] ?? '' ?>" <?= $selected ?>><?= $row['category_name'] ?? '' ?></option>
              <?php
              }
              ?>
            </select>
          </div>

          <div class="col-md-12">
            <label for="article_name" class="form-label">Tiêu đề</label>
            <textarea type="text" class="form-control" id="article_name" name="article_name"><?= $article_name ?></textarea>
          </div>

          <div class="col-md-12">
            <label for="content" class="form-label">Nội dung</label>
            <textarea name="editor1"><?= $article_content ?></textarea>
          </div>

          <div class="col-md-12">
            <div class="row">
              <div class="col-md-6">
                <label for="img" class="form-label">Thêm hình ảnh</label>
                <input type="file" id="img" name="files[]" multiple accept="image/*" multiple onchange="limitFiles(event)">
              </div>
              <div class="col-md-6"  id="imagePreview"> 
                <!-- Hiển thị hình ảnh đã có và các hình ảnh mới được tải lên -->
                <?php
                  $image_paths_array = explode(',', $img);
                if (!empty($image_paths_array)) {
                  foreach ($image_paths_array as $image_path) {
                    if (file_exists('../img/' . $image_path)) {
                      echo '<img src="../img/' . $image_path . '" alt="Hình ảnh bài viết" height="200px" class="p-2" width="200px">';
                     
                    } else {
                      echo 'Chưa có ảnh được chọn';
                    }
                  }
                }
                ?>
              </div>
            </div>
          </div>

          <div class="col-12">
            <input type="hidden" name="article_id" value="<?= $article_id ?>">
            <input class="btn btn-primary" type="submit" value="Cập nhật" name="update"></input>
            <a href="index.php?act=article-list"><input class="btn btn-primary" type="button" value="Danh sách"></input></a>
          </div>
        </form>
      </div>
    </div>
  </div>

  
  <script src="https://cdn.ckeditor.com/4.17.1/standard/ckeditor.js"></script>
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/jquery.validate.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/additional-methods.min.js"></script>
  <script>
    CKEDITOR.replace('editor1', {
      // Cấu hình CKEditor
    });
    

    function limitFiles(event) {
    const input = event.target;
    const preview = document.getElementById('imagePreview');
    const files = input.files;

    preview.innerHTML = ''; // Xóa hình ảnh hiện có

    if (files.length > 2) {
        alert("Chỉ được tải lên tối đa 2 ảnh");
        input.value = null;
    } else {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = 'Hình ảnh bài viết';
                img.height = '200px';
                img.width = '200px';
                img.classList.add('p-2');
                preview.appendChild(img);
            }

            reader.readAsDataURL(file);
        }
    }
}

$(document).ready(function() {
     $('#article-form').validate({
         rules: {
             category_id: {
                 required: true
             },
             article_name: {
                 required: true
             },
             // Add other validation rules for remaining fields if needed
         },
         messages: {
             category_id: {
                 required: "Vui lòng chọn danh mục"
             },
             article_name: {
                 required: "Vui lòng nhập tiêu đề"
             },
             // Add messages for other fields if needed
         },
         submitHandler: function(form) {
             form.submit();
         }
     });
 });

  </script>
 
