SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE transactions (
  id int(11) NOT NULL AUTO_INCREMENT,
  date date NOT NULL,
  description varchar(100) NOT NULL,
  amount int(10) NOT NULL,
  category varchar(10) NOT NULL,
  username varchar(20) NOT NULL,
  PRIMARY KEY (id),
  KEY username_idx (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE users (
  username varchar(20) NOT NULL,
  nombre varchar(75) NOT NULL,
  password varchar(255) NOT NULL,
  PRIMARY KEY (username)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

ALTER TABLE transactions
  ADD CONSTRAINT fk_transactions_users FOREIGN KEY (username) 
  REFERENCES users (username) ON DELETE CASCADE ON UPDATE CASCADE;
