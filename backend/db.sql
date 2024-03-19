CREATE SCHEMA `reactblog` DEFAULT CHARACTER SET utf8 ;


--------------------------------------------------------------------------------

--------------------------------------------------------------------------------
CREATE TABLE `admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(450) NOT NULL,
  `password` varchar(450) NOT NULL,
  `email` varchar(450) NOT NULL,
  `first_name` varchar(450) DEFAULT NULL,
  `last_name` varchar(450) DEFAULT NULL,
  `master` varchar(450) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;



-- 1.
INSERT INTO `admins` (`id`, `username`, `password`, `email`, `first_name`,`last_name`, `master`) VALUES (NULL, 'admin.root', '$2a$10$oQIQOXdTxDNxpOSyjYYhcuM.oepbdxwZIlxhrilz9VPzElT/PHAjm', 'admin@root.com','root', 'root', '1');
-- password user: admin.root  email: admin@root.com  pass: Admin-root1


--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nume_produs` varchar(200) NOT NULL,
  `descriere_produs` varchar(500) NOT NULL,
  `poza_url` varchar(500) NOT NULL,
  `categorie_produs` varchar(45) NOT NULL,
  `pret_produs` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nume` varchar(255) NOT NULL,
  `prenume` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `parola` varchar(255) NOT NULL,
  `dataadaugare` datetime DEFAULT CURRENT_TIMESTAMP,
  `country` varchar(255) DEFAULT NULL,
  `county` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci
--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

CREATE TABLE `orders` (
  `id_orders` int NOT NULL AUTO_INCREMENT,
  `country` varchar(70) NOT NULL,
  `address` varchar(4500) NOT NULL,
  `items` json NOT NULL,
  `paid_card` int NOT NULL,
  `comments` varchar(300) DEFAULT NULL,
  `status` varchar(45) NOT NULL DEFAULT 'online',
  PRIMARY KEY (`id_orders`),
  UNIQUE KEY `id_orders_UNIQUE` (`id_orders`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci


--------------------------------------------------------------------------------