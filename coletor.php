<?php
 
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    $email = $_POST['email'];
    $telefone = $_POST['telefone'];
    $nome = $_POST['nome'];
    $tema = $_POST['tema'];
    $mensagem = $_POST['mensagem'];

   
    $fp = fopen('dados.csv', 'a');
    fputcsv($fp, [$email, $telefone, $nome, $tema, $mensagem]);
    fclose($fp);


    header('Location: sucesso.html');
    exit();
  }