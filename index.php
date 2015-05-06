<?php include 'php/bgrandom.php'; 
require('../vendor/autoload.php'); ?>
<!doctype html>
<html lang="en">
<head>
  <style type="text/css">
    body{
    background: url(img/<?php echo $selectedBg; ?>) no-repeat;
    }
  </style>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>GenPlay</title>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
  <link rel="stylesheet" href="css/styleMain.css">
  <link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
</head>
<body>
  <div class="site-wrapper">
      <div class="site-wrapper-inner">
        <div class="cover-container">
          <div class="cover-heading">

            <img src="img/banner.png" class"img-responsive">

          </div>

          <div class="cover-main">
            <div class="row">

              <p class="lead">Submit an artists name to generate a playlist of songs similar to the artist</p>

              <div class="col-lg-2"></div>
              <form action="" method="POST">

              <div class="col-lg-8">
                <div class="input-group">

                  <input type="text" class="form-control" placeholder="Artist name" name="artist">
                  <span class="input-group-btn">
                    <button class="btn btn-default" type="button">Go</button>
                  </span>

                </div>
              </div>
              <div class="col-lg-2"></div>
            </div><!-- /.row -->
            <div class="panel panel-default" class="result">

              <!-- Table -->
              <table class="table">
                <thead>
                  <tr>
                    <th >
                      #
                    </th>
                    <th class="thead">
                      Artist
                    </th>
                    <th class="thead">
                      Song
                    </th>
                  </tr>
                </thead>

                <?php include 'php/apiresult.php'; ?>

              </table>

                <ul id="filters" class="nav nav-pills">
                  <li role="presentation" class="active">
                    <a href="#/">New</a>
                  </li>
                  <li role="presentation">
                    <a href="#/saved">Saved</a>
                  </li>
                </ul>

            </div>
        </div>
      </div>
    </div>

  <script src="js/lib/jquery.min.js"></script>
  <script src="js/lib/underscore-min.js"></script>
  <script src="js/lib/backbone.js"></script>
  <script src="js/lib/backbone.localStorage.js"></script>
  <script src="js/views/app.js"></script>
  <script src="js/routers/router.js"></script>
  <script src="js/app.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>

</body>
</html>