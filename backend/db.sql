CREATE SCHEMA `acwebsit_reactblog` DEFAULT CHARACTER SET utf8 ;


--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

CREATE TABLE `acwebsit_reactblog`.`admins` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(450) NOT NULL,
  `password` varchar(450) NOT NULL,
  `email` varchar(450) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8

-- 1.

ALTER TABLE `acwebsit_reactblog`.`admins` 
ADD COLUMN `master` TINYINT NULL AFTER `email`;

-- 2.
ALTER TABLE `acwebsit_reactblog`.`admins` 
CHANGE COLUMN `master` `master` VARCHAR(450) NULL ;

-- 3.
INSERT INTO `admins` (`id`, `username`, `password`, `email`, `first_name`,`last_name`, `master`) VALUES (NULL, 'admin.root', '$2a$10$oQIQOXdTxDNxpOSyjYYhcuM.oepbdxwZIlxhrilz9VPzElT/PHAjm', 'admin@root.com','root', 'root', '1');
-- password user: admin.root  email: admin@root.com  pass: Admin-root1


--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

CREATE TABLE `acwebsit_reactblog`.`products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nume_produs` varchar(200) NOT NULL,
  `descriere_produs` varchar(500) NOT NULL,
  `poza_url` varchar(500) NOT NULL,
  `categorie_produs` varchar(45) NOT NULL,
  `pret_produs` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

CREATE TABLE `acwebsit_reactblog`.`users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `nume` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `prenume` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `parola` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `dataadaugare` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8

--------------------------------------------------------------------------------

--------------------------------------------------------------------------------

-- 1.
CREATE TABLE `acwebsit_reactblog`.`orders` (
  `id_orders` INT NOT NULL AUTO_INCREMENT,
  `country` VARCHAR(70) NOT NULL,
  `address` VARCHAR(4500) NOT NULL,
  `items` VARCHAR(7000) NOT NULL,
  `comments` VARCHAR(300) NULL,
  PRIMARY KEY (`id_orders`),
  UNIQUE INDEX `id_orders_UNIQUE` (`id_orders` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- 2.
ALTER TABLE `acwebsit_reactblog`.`orders` 
ADD COLUMN `paid_card` TINYINT NOT NULL DEFAULT 0 AFTER `items`,
CHANGE COLUMN `country` `country` VARCHAR(70) NOT NULL ,
CHANGE COLUMN `items` `items` JSON NOT NULL ;

--3.
ALTER TABLE `acwebsit_reactblog`.`orders` 
ADD COLUMN `status` VARCHAR(45) NOT NULL DEFAULT 'online' AFTER `comments`;


--------------------------------------------------------------------------------