<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Avatar App</title>
    <link rel="stylesheet" href="styles.css">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#avatar-select').change(function() {
                $('#avatar-form').submit();
            });
        });
    </script>
</head>
<body>
    <div class="container">
        <h2>Welcome, <?php echo $username; ?>!</h2>
        <img src="avatars/<?php echo $current_avatar; ?>" alt="Current Avatar" width="100">
        <form id="avatar-form" method="post" action="">
            <select id="avatar-select" name="avatar">
                <option value="default.png" <?php if ($current_avatar == 'default.png') echo 'selected'; ?>>Default</option>
                <option value="avatar1.png" <?php if ($current_avatar == 'avatar1.png') echo 'selected'; ?>>Avatar 1</option>
                <option value="avatar2.png" <?php if ($current_avatar == 'avatar2.png') echo 'selected'; ?>>Avatar 2</option>
                <option value="avatar3.png" <?php if ($current_avatar == 'avatar3.png') echo 'selected'; ?>>Avatar 3</option>
            </select>
        </form>
        <br>
        <a href="logout.php">Logout</a>
    </div>
</body>
</html>
