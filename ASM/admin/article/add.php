<script src="https://cdn.ckeditor.com/4.17.1/standard/ckeditor.js"></script>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>


<style>
    label.error {
        color: red;
    }
</style>

<div class="container">
    <div class="alert alert-light shadow text-center" role="alert">
        <h4>Thêm bài viết</h4>
    </div>
    <?php
    if (!empty($alert)) {
        echo $alert; // Hiển thị thông báo thành công nếu có giá trị
    }

    ?>
    <form id="article-form" class="row g-3 mx-auto mb-3" action="index.php?act=article-add" method="post" enctype="multipart/form-data">
        <div class="col-md-12">
            <label for="category_id" class="form-label">Thuộc danh mục</label>
            <select class="form-select" id="category_id" name="category_id">
                <option value="">Chọn danh mục</option>
                <?php

                $list_loai = loai_select_all();
                foreach ($list_loai as $row) {
                    extract($row);
                    echo '<option value="' . $category_id . '" name="category_id">' . $category_name . '</option>';
                }
                ?>
            </select>
        </div>

        <div class="col-md-12">
            <label for="article_name" class="form-label">Tiêu đề</label>
            <textarea type="text" class="form-control" id="article_name" name="article_name"></textarea>
        </div>

        <div class="col-md-12">
            <label for="content" class="form-label">Nội dung</label>
            <textarea name="editor1" id="editor1"></textarea>
        </div>

        <div class="col-md-12">
            <label for="img" class="form-label">Hình ảnh</label>
            <input type="file" id="img" name="files[]" multiple accept="image/*" multiple>

            <div id="preview"></div>
        </div>
        <div class="col-12">
            <input class="btn btn-primary" type="submit" value="Thêm mới" name="add">
            <input class="btn btn-primary" type="reset" value="Nhập lại">
            <a href="index.php?act=article-list"><input class="btn btn-primary" type="button" value="Danh sách"></a>
        </div>
    </form>

</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/jquery.validate.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-validate/1.19.3/additional-methods.min.js"></script>

<script>
    CKEDITOR.replace('editor1', {

    });

    const input = document.getElementById('img');
    const preview = document.getElementById('preview');
    const maxFiles = 2; // Số lượng file tối đa được phép upload

    input.addEventListener('change', function() {
        preview.innerHTML = '';

        const files = this.files;
        const totalFiles = files.length;

        if (totalFiles > maxFiles) {
            alert(`Chỉ được phép tải lên tối đa ${maxFiles} ảnh`);
            this.value = ''; // Reset input nếu vượt quá số lượng cho phép
            return;
        }

        for (let i = 0; i < totalFiles; i++) {
            const file = files[i];
            const reader = new FileReader();

            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '200px';
                img.style.marginRight = '10px';
                img.style.marginBottom = '10px';
                preview.appendChild(img);
            }

            reader.readAsDataURL(file);
        }
    });
    //Validate Form


    $(document).ready(function() {
        $('#article-form').validate({
            ignore: [],

            rules: {

                category_id: {
                    required: true
                },
                article_name: {
                    required: true
                },
                // Add other validation rules for remaining fields if needed
            },
            editor1: {
                required: function(textarea) {
                    CKEDITOR.instances[editor1].updateElement();
                    var editorcontent = textarea.value.replace(/<[^>]*>/gi, '');
                    return editorcontent.length === 0;
                }
            },
            messages: {
                firstname: {
                    required: "Enter first name"
                },
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