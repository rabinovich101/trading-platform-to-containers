CREATE TABLE `orders` (
  `Client_ID` varchar(255) NOT NULL,
  `Order_id` int NOT NULL,
  `Order_Type` enum('buy','sell','deposite','withdrawal','bonus','orderBookIn','orderBookOut') DEFAULT NULL,
  `Currency` varchar(255) NOT NULL,
  `Amount` decimal(20,5) NOT NULL,
  `Price` decimal(20,5) NOT NULL,
  `CreatedAt` varchar(19) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nemonics` (
  `Client_ID` varchar(255) NOT NULL,
  `Currency` varchar(255) NOT NULL,
  `Memonic` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `uniqID` varchar(255) NOT NULL,
  `Coin_Index` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) GENERATED ALWAYS AS (substring_index(`email`,_utf8mb4'@',1)) VIRTUAL NOT NULL,
  `country_residency` varchar(255),
  `country_living` varchar(255),
  `password` varchar(255) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `alias` varchar(255) DEFAULT NULL,
  `type_account` varchar(45) NOT NULL,
  `status_account` varchar(45) NOT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`uniqID`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `Coin_Index` (`Coin_Index`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `withrawals` (
	`Id` INT NOT NULL AUTO_INCREMENT,
    `Client_id` varchar(255) NOT NULL,
    `Currency` varchar(255) NOT NULL,
    `Amount` decimal(20,5) NOT NULL,
    `Status` enum('pending', 'complete', 'denied', 'in process', 'review', 'wait for review') DEFAULT NULL,
    `timestamp` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY `id` (`id`)
);


CREATE TABLE `deposites` (
	`Id` INT NOT NULL AUTO_INCREMENT,
    `Client_id` varchar(255) NOT NULL,
	`Currency` varchar(255) NOT NULL,
    `Amount` decimal(20,5) NOT NULL,
    `Status` enum('in process', 'completed') DEFAULT NULL,
	`TxId` varchar(255) NOT NULL,
	`timestamp` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    KEY `id` (`id`)
);

DELIMITER $$
CREATE FUNCTION `available`(id varchar(255), currency varchar(255)) RETURNS decimal(65,30)
    DETERMINISTIC
BEGIN
set @buy_balance = ifnull((SELECT sum(Amount) as balance FROM `trading_platform`.`orders`
	where Order_Type = 'buy' and Client_ID = id and `trading_platform`.`orders`.Currency = currency),0);
set @sell_balance = ifnull((SELECT sum(Amount) as balance FROM `trading_platform`.`orders`
	where Order_Type = 'sell' and Client_ID = id and `trading_platform`.`orders`.Currency = currency),0);
set @deposite_balance = ifnull((SELECT sum(Amount) as balance FROM `trading_platform`.`orders`
	where Order_Type = 'deposite' and Client_ID = id and `trading_platform`.`orders`.Currency = currency),0);
set @withdrawal_withdraw = ifnull((SELECT sum(Amount) as balance FROM `trading_platform`.`withrawals`
	where Client_id = id and `trading_platform`.`withrawals`.Currency = currency), 0);
set @bonus_balance = ifnull((SELECT sum(Amount) as balance FROM `trading_platform`.`orders`
	where Order_Type = 'bonus' and Client_ID = id and `trading_platform`.`orders`.Currency = currency), 0);
set @orderBookIn = ifnull((SELECT sum(Amount) as balance FROM `trading_platform`.`orders`
	where Order_Type = 'orderBookIn' and Client_ID = id and `trading_platform`.`orders`.Currency = currency), 0);
set @orderBookOut = ifnull((SELECT sum(Amount) as balance FROM `trading_platform`.`orders`
	where Order_Type = 'orderBookOut' and Client_ID = id and `trading_platform`.`orders`.Currency = currency), 0);
set @balance = @buy_balance - @sell_balance + @deposite_balance + @bonus_balance - @orderBookIn + @orderBookOut - @withdrawal_withdraw;
RETURN @balance;
END$$
DELIMITER ;


DELIMITER $$
CREATE DEFINER=`root`@`localhost` FUNCTION `balance`(id varchar(255), currency varchar(255)) RETURNS decimal(65,30)
    DETERMINISTIC
BEGIN
set @buy_balance = ifnull((SELECT sum(Amount) as balance FROM `trading_platform`.`orders`
	where Order_Type = 'buy' and Client_ID = id and `trading_platform`.`orders`.Currency = currency),0);
set @sell_balance = ifnull((SELECT sum(Amount) as balance FROM `trading_platform`.`orders`
	where Order_Type = 'sell' and Client_ID = id and `trading_platform`.`orders`.Currency = currency),0);
set @deposite_balance = ifnull((SELECT sum(Amount) as balance FROM `trading_platform`.`orders`
	where Order_Type = 'deposite' and Client_ID = id and `trading_platform`.`orders`.Currency = currency),0);
set @withdrawal_balance = ifnull((SELECT sum(Amount) as balance FROM `trading_platform`.`orders`
	where Order_Type = 'withdrawal' and Client_ID = id and `trading_platform`.`orders`.Currency = currency), 0);
set @bonus_balance = ifnull((SELECT sum(Amount) as balance FROM `trading_platform`.`orders`
	where Order_Type = 'bonus' and Client_ID = id and `trading_platform`.`orders`.Currency = currency), 0);
set @balance = @buy_balance - @sell_balance + @deposite_balance - @withdrawal_balance + @bonus_balance;
RETURN @balance;
END$$
DELIMITER ;


delimiter //
CREATE TRIGGER `update_withdraw`
AFTER UPDATE ON `trading_platform`.`withrawals`
FOR EACH ROW
BEGIN
	IF new.Status = 'in process' THEN
		INSERT INTO orders (Client_ID, Order_id, Order_Type, Currency, Amount, Price,CreatedAt) 
    VALUES (new.Client_id, new.Id, 'withdrawal',new.Currency, new.Amount, 0, now());
    END IF;
END;//
delimiter ;
