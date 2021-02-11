<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Loading...</title>
    <link href="/img/favicon.png" rel="icon" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Abel&family=Anton&display=swap" />
    <style>
        html, body {
            font-family: Abel,sans-serif;
        }
        h4, h3, h2 {font-family: Anton,sans-serif;}
        .alert-success {
            color: rgb(245, 253, 248);
            background-color: rgb(13, 209, 87);
            border-color: rgb(13, 209, 87);
        }
        .alert-danger {
            color: #f8f9fa;
            background-color: #bd2130;
            border-color: #bd2130;
        }
    </style>
</head>
<body class="bg-light">
    <div class="d-flex justify-content-between">
        <div class="p-2">
            <a href="javascript:history.back(1)" class="text-dark btn">
                <i class="ionicons ion-android-arrow-back" style="font-size: 30px"></i>
            </a>
        </div>
        <div class="p-2 text-right">
            <button onclick="window.location.assign('/')" class="text-dark btn">
                <i class="ionicons ion-close"></i>
            </button>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-10 offset-sm-1 col-10 offset-1 col">
                <div id="message"></div>
            </div>
        </div>
    </div>
    
    
    <script>
        
        let params = window.location.search.replace('?','').split('token=')[1];
        let email = window.localStorage.getItem('email');
        let elem = document.getElementById("message");
        let uid = window.atob(params)

        if(uid === email) {
            document.title = 'Activated account';
            elem.innerHTML = `
            <h3 class="text-center mt-5 pt-5 mb-4">
                <a href="/">
                    <img src="/img/logo.png" class="d-flex justify-content-center mb-3" style="width: 200px; margin: auto;" />
                </a>
                Activated account
            </h3>
            <div class="alert alert-success text-center">
                <strong>Success!</strong> 
                You have successfully activated your account.
                <a href="/" class="btn bg-white btn-sm pt-0 pb-0">Ok</a>
            </div>
            `;
        } else {
            document.title = 'Authorisation Error';
            elem.innerHTML = `
                            <h3 class="text-center mt-5 pt-5 mb-4">Token error</h3>
                            <div class="alert alert-danger">
                                <div class="media">
                                    <i class="ionicons ion-alert-circled mr-3" style="font-size: 90px;opacity: 0.2;"></i>
                                    <div class="media-body">
                                        <h4 class="m-0">Authorisation Error</h4>
                                        <p class="m-0">Attention, we cannot confirm your e-mail because the token is out of date or is incorrect.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-12 text-center">
                                <button type="button" class="btn btn-dark mr-2">Resend code</button>
                                <button onclick="window.location.assign('/')" class="btn btn-outline-dark">Cancel</button>
                            </div>
                            `;
        }
        
    </script>
</body>
</html>