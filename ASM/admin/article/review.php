<!-- CSS here -->
<link rel="stylesheet" href="./view/assets/css/bootstrap.min.css">
<link rel="stylesheet" href="../view/assets/css/owl.carousel.min.css">
<link rel="stylesheet" href="../view/assets/css/ticker-style.css">
<link rel="stylesheet" href="../view/assets/css/flaticon.css">
<link rel="stylesheet" href="../view/assets/css/slicknav.css">
<link rel="stylesheet" href="../view/assets/css/animate.min.css">
<link rel="stylesheet" href="../view/assets/css/magnific-popup.css">
<link rel="stylesheet" href="../view/assets/css/fontawesome-all.min.css">
<link rel="stylesheet" href="../view/assets/css/themify-icons.css">
<link rel="stylesheet" href="../view/assets/css/slick.css">
<link rel="stylesheet" href="../view/assets/css/nice-select.css">
<link rel="stylesheet" href="../view/assets/css/style.css">

<!-- Preloader Start -->
<div id="preloader-active">
    <div class="preloader d-flex align-items-center justify-content-center">
        <div class="preloader-inner position-relative">
            <div class="preloader-circle"></div>
            <div class="preloader-img pere-text">
                <img src="/assets/img/logo/logo.png" alt="">
            </div>
        </div>
    </div>
</div>
<!-- Preloader Start -->


<?php extract($reviewArt);
$anh = '../img/' . $img;
$image_paths_array = explode(',', $img);
$image_html_locations = []; // Khởi tạo mảng chứa thẻ hình ảnh hoặc thông báo

foreach ($image_paths_array as $image_path) {
    $full_image_path = '../img/' . trim($image_path);

    if (file_exists($full_image_path)) {
        $image_html_locations[] = '<img class="card-img" src="' . $full_image_path . '" alt="Hình ảnh bài viết" style="max-height: 400px;">';
    } else {
        $image_html_locations[] = 'Chưa có ảnh được chọn';
    }
}

$article_id = $id; 
$article_url = "https://652e-171-246-70-20.ngrok-free.app/Nhom5/article.php?id=$article_id"; 

?>
<main>
    <!-- About US Start -->
    <div class="about-area">
        <div class="container">
            <!-- Hot Aimated News Tittle-->
            <div class="row">
                <div class="col-lg-12">
                    <div class="trending-tittle">
                        <strong>XU HƯỚNG</strong>
                        <!-- <p>Rem ipsum dolor sit amet, consectetur adipisicing elit.</p> -->
                        <div class="trending-animated">
                            <ul id="js-news" class="js-hidden">
                                <li class="news-item">Tin tức mới nhất được cập nhật</li>
                                <li class="news-item">Tin tức mới nhất được cập nhật</li>
                                <li class="news-item">Tin tức mới nhất được cập nhật</li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-8">
                    <!-- Trending Tittle -->
                    <div class="about-right mb-90">
                        <div class="about-img">
                            <img src="../view/assets/img/trending/trending_top.jpg" alt="">
                        </div>
                        <div class="section-tittle mb-30 pt-30">
                            <h3><?= $article_name ?></h3>
                        </div>
                        <div class="about-prea">
                            <?= $image_html_locations[0] ?>
                            <p class="about-pera1 mb-25">
                                <?= $article_content ?>
                            </p>
                            <?php if (isset($image_html_locations[1])) : ?>
                                <?= $image_html_locations[1] ?>
                            <?php endif; ?>

                        </div>
                        <div class="section-tittle">
                            <h3></h3>
                        </div>
                        <div class="about-prea">
                            <p class="about-pera1 mb-25">

                            </p>
                            <p class="about-pera1 mb-25"></p>
                            <p class="about-pera1 mb-25">

                            </p>
                            <p class="about-pera1 mb-25">

                            </p>
                            <p class="about-pera1 mb-25">

                            </p>
                        </div>
                        <div class="social-share pt-30">
                            <div class="section-tittle">
                                <h3 class="mr-20">Chia sẻ:</h3>
                                <ul>
                                    <li><a href="#"><img src="../view/assets/img/news/icon-ins.png" alt=""></a></li>
                                    <li><a href="https://www.facebook.com/sharer/sharer.php?u=<?= urlencode($article_url) ?>"><img src="../view/assets/img/news/icon-fb.png" alt=""></a></li>
                                    <li><a href="#"><img src="../view/assets/img/news/icon-tw.png" alt=""></a></li>
                                    <li><a href="#"><img src="../view/assets/img/news/icon-yo.png" alt=""></a></li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- From -->
                    <div class="row">
                        <div class="col-lg-8">
                            <form class="form-contact contact_form mb-80" action="contact_process.php" method="post" id="contactForm" novalidate="novalidate">
                                <div class="row">
                                    <div class="col-12">
                                        <div class="form-group">
                                            <textarea class="form-control w-100 error" name="message" id="message" cols="30" rows="9" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Nhập nội dung'" placeholder="Nhập nội dung"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <input class="form-control error" name="name" id="name" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Nhập tên'" placeholder="Enter your name">
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="form-group">
                                            <input class="form-control error" name="email" id="email" type="email" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Nhập email'" placeholder="Email">
                                        </div>
                                    </div>
                                    <div class="col-12">
                                        <div class="form-group">
                                            <input class="form-control error" name="subject" id="subject" type="text" onfocus="this.placeholder = ''" onblur="this.placeholder = 'Enter Subject'" placeholder="Tiêu đề">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group mt-3">
                                    <button type="submit" class="button button-contactForm boxed-btn">Gửi</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4">
                    <!-- Section Tittle -->
                    <div class="section-tittle mb-40">
                        <h3>Theo dõi chúng tôi</h3>
                    </div>
                    <!-- Flow Socail -->
                    <div class="single-follow mb-45">
                        <div class="single-box">
                            <div class="follow-us d-flex align-items-center">
                                <div class="follow-social">
                                    <a href="#"><img src="../view/assets/img/news/icon-fb.png" alt=""></a>
                                </div>
                                <div class="follow-count">
                                    <span>8,045</span>
                                    <p>Fans</p>
                                </div>
                            </div>
                            <div class="follow-us d-flex align-items-center">
                                <div class="follow-social">
                                    <a href="#"><img src="../view/assets/img/news/icon-tw.png" alt=""></a>
                                </div>
                                <div class="follow-count">
                                    <span>8,045</span>
                                    <p>Fans</p>
                                </div>
                            </div>
                            <div class="follow-us d-flex align-items-center">
                                <div class="follow-social">
                                    <a href="#"><img src="../view/assets/img/news/icon-ins.png" alt=""></a>
                                </div>
                                <div class="follow-count">
                                    <span>8,045</span>
                                    <p>Fans</p>
                                </div>
                            </div>
                            <div class="follow-us d-flex align-items-center">
                                <div class="follow-social">
                                    <a href="#"><img src="../view/assets/img/news/icon-yo.png" alt=""></a>
                                </div>
                                <div class="follow-count">
                                    <span>8,045</span>
                                    <p>Fans</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- New Poster -->
                    <div class="news-poster d-none d-lg-block">
                        <img src="../view/assets/img/news/news_card.jpg" alt="">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- About US End -->
</main>

<!-- JS here -->

<!-- All JS Custom Plugins Link Here here -->
<script src="../view/assets/js/vendor/modernizr-3.5.0.min.js"></script>
<!-- Jquery, Popper, Bootstrap -->
<script src="../view/assets/js/vendor/jquery-1.12.4.min.js"></script>
<script src="../view/assets/js/popper.min.js"></script>
<script src="../view/assets/js/bootstrap.min.js"></script>
<!-- Jquery Mobile Menu -->
<script src="../view/assets/js/jquery.slicknav.min.js"></script>

<!-- Jquery Slick , Owl-Carousel Plugins -->
<script src="../view/assets/js/owl.carousel.min.js"></script>
<script src="../view/assets/js/slick.min.js"></script>
<!-- Date Picker -->
<script src="../view/assets/js/gijgo.min.js"></script>
<!-- One Page, Animated-HeadLin -->
<script src="../view/assets/js/wow.min.js"></script>
<script src="../view/assets/js/animated.headline.js"></script>
<script src="../view/assets/js/jquery.magnific-popup.js"></script>

<!-- Breaking New Pluging -->
<script src="../view/assets/js/jquery.ticker.js"></script>
<script src="../view/assets/js/site.js"></script>

<!-- Scrollup, nice-select, sticky -->
<script src="../view/assets/js/jquery.scrollUp.min.js"></script>
<script src="../view/assets/js/jquery.nice-select.min.js"></script>
<script src="../view/assets/js/jquery.sticky.js"></script>

<!-- contact js -->
<script src="../view/assets/js/contact.js"></script>
<script src="../view/assets/js/jquery.form.js"></script>
<script src="../view/assets/js/jquery.validate.min.js"></script>
<script src="../view/assets/js/mail-script.js"></script>
<script src="../view/assets/js/jquery.ajaxchimp.min.js"></script>

<!-- Jquery Plugins, main Jquery -->
<script src="../view/assets/js/plugins.js"></script>
<script src="../view/assets/js/main.js"></script>