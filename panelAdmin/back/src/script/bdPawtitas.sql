-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: pawtitas
-- ------------------------------------------------------
-- Server version	8.0.37

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administradores`
--

DROP TABLE IF EXISTS `administradores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administradores` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `fechaRegistro` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administradores`
--

LOCK TABLES `administradores` WRITE;
/*!40000 ALTER TABLE `administradores` DISABLE KEYS */;
/*!40000 ALTER TABLE `administradores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carritos`
--

DROP TABLE IF EXISTS `carritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `fechaAgregado` datetime NOT NULL,
  `idCliente` int NOT NULL,
  `idProducto` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idCliente` (`idCliente`),
  KEY `idProducto` (`idProducto`),
  CONSTRAINT `carritos_ibfk_325` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carritos_ibfk_326` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritos`
--

LOCK TABLES `carritos` WRITE;
/*!40000 ALTER TABLE `carritos` DISABLE KEYS */;
/*!40000 ALTER TABLE `carritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carritoxproducto`
--

DROP TABLE IF EXISTS `carritoxproducto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritoxproducto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `idCarrito` int NOT NULL,
  `idProducto` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `carritoXProducto_idProducto_idCarrito_unique` (`idCarrito`,`idProducto`),
  KEY `idProducto` (`idProducto`),
  CONSTRAINT `carritoxproducto_ibfk_13` FOREIGN KEY (`idCarrito`) REFERENCES `carritos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `carritoxproducto_ibfk_14` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritoxproducto`
--

LOCK TABLES `carritoxproducto` WRITE;
/*!40000 ALTER TABLE `carritoxproducto` DISABLE KEYS */;
/*!40000 ALTER TABLE `carritoxproducto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categorias`
--

DROP TABLE IF EXISTS `categorias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categorias` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `imagenUrl` text,
  `activa` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categorias`
--

LOCK TABLES `categorias` WRITE;
/*!40000 ALTER TABLE `categorias` DISABLE KEYS */;
INSERT INTO `categorias` VALUES (1,'Accesorios','collares, pretales, etc.','https://example.com/accesorios.jpg',1),(2,'Alimentos','Comida para mascotas','https://example.com/alimentos.jpg',1),(3,'Juguetes','Juguetes para perros y gatos','https://example.com/juguetes.jpg',1),(11,'Salud','antiparásitos, suplementos y medicinas.',NULL,1),(12,'otros','xxx',NULL,0),(13,'aaaaa','ss',NULL,0),(14,'ssdd','ddd',NULL,0),(15,'sdd','ss',NULL,0);
/*!40000 ALTER TABLE `categorias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contraseña` varchar(255) DEFAULT NULL,
  `fechaRegistro` datetime DEFAULT NULL,
  `googleId` varchar(255) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `proveedor` enum('local','google') DEFAULT 'local',
  `direccion` varchar(255) DEFAULT NULL,
  `ciudad` varchar(255) DEFAULT NULL,
  `provincia` varchar(255) DEFAULT NULL,
  `codigoPostal` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `fechaNacimiento` date DEFAULT NULL,
  `genero` enum('masculino','femenino','otro') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `googleId` (`googleId`),
  UNIQUE KEY `googleId_2` (`googleId`),
  UNIQUE KEY `googleId_3` (`googleId`),
  UNIQUE KEY `googleId_4` (`googleId`),
  UNIQUE KEY `googleId_5` (`googleId`),
  UNIQUE KEY `googleId_6` (`googleId`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Joana Romay','yohanaromay@gmail.com',NULL,'2025-10-22 17:26:38','101129008741227322320','https://lh3.googleusercontent.com/a/ACg8ocKtoOx_TkbOwA0sKaKfy6n8L5dEZO6xRwqLi7G2Q63Bh1aH1-sE=s96-c','google','calle desconocida 12345','Buenos Aires','Cordoba','1417','1125912170','1998-09-18','femenino');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cupondescuentos`
--

DROP TABLE IF EXISTS `cupondescuentos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cupondescuentos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombreCupon` varchar(255) NOT NULL,
  `codigoCupon` varchar(255) NOT NULL,
  `porcentajeDescuento` int NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cupondescuentos`
--

LOCK TABLES `cupondescuentos` WRITE;
/*!40000 ALTER TABLE `cupondescuentos` DISABLE KEYS */;
/*!40000 ALTER TABLE `cupondescuentos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalle_orden`
--

DROP TABLE IF EXISTS `detalle_orden`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalle_orden` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `precioUnitario` decimal(10,2) NOT NULL,
  `subTotal` decimal(10,2) NOT NULL,
  `idOrden` int NOT NULL,
  `idProducto` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idOrden` (`idOrden`),
  KEY `idProducto` (`idProducto`),
  CONSTRAINT `detalle_orden_ibfk_69` FOREIGN KEY (`idOrden`) REFERENCES `ordenes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `detalle_orden_ibfk_70` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalle_orden`
--

LOCK TABLES `detalle_orden` WRITE;
/*!40000 ALTER TABLE `detalle_orden` DISABLE KEYS */;
/*!40000 ALTER TABLE `detalle_orden` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detallesordenes`
--

DROP TABLE IF EXISTS `detallesordenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detallesordenes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cantidad` int NOT NULL,
  `precioUnitario` decimal(10,2) NOT NULL,
  `subTotal` decimal(10,2) NOT NULL,
  `idOrden` int NOT NULL,
  `idProducto` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `detallesOrdenes_idProducto_idOrden_unique` (`idOrden`,`idProducto`),
  KEY `idProducto` (`idProducto`),
  CONSTRAINT `detallesordenes_ibfk_91` FOREIGN KEY (`idOrden`) REFERENCES `ordenes` (`id`),
  CONSTRAINT `detallesordenes_ibfk_92` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detallesordenes`
--

LOCK TABLES `detallesordenes` WRITE;
/*!40000 ALTER TABLE `detallesordenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `detallesordenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagenesproductos`
--

DROP TABLE IF EXISTS `imagenesproductos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagenesproductos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `urlImagen` text NOT NULL,
  `idProducto` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idProducto` (`idProducto`),
  CONSTRAINT `imagenesproductos_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagenesproductos`
--

LOCK TABLES `imagenesproductos` WRITE;
/*!40000 ALTER TABLE `imagenesproductos` DISABLE KEYS */;
INSERT INTO `imagenesproductos` VALUES (1,'https://http2.mlstatic.com/D_NQ_NP_2X_916475-MLA83311811303_032025-F.webp',11);
/*!40000 ALTER TABLE `imagenesproductos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mejorvalorados`
--

DROP TABLE IF EXISTS `mejorvalorados`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mejorvalorados` (
  `id` int NOT NULL AUTO_INCREMENT,
  `productoId` int NOT NULL,
  `cantidadVotos` int NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `productoId` (`productoId`),
  UNIQUE KEY `productoId_2` (`productoId`),
  UNIQUE KEY `productoId_3` (`productoId`),
  UNIQUE KEY `productoId_4` (`productoId`),
  UNIQUE KEY `productoId_5` (`productoId`),
  UNIQUE KEY `productoId_6` (`productoId`),
  UNIQUE KEY `productoId_7` (`productoId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mejorvalorados`
--

LOCK TABLES `mejorvalorados` WRITE;
/*!40000 ALTER TABLE `mejorvalorados` DISABLE KEYS */;
/*!40000 ALTER TABLE `mejorvalorados` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensajes`
--

DROP TABLE IF EXISTS `mensajes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mensajes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `texto` text NOT NULL,
  `idProducto` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idProducto` (`idProducto`),
  CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`idProducto`) REFERENCES `productos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensajes`
--

LOCK TABLES `mensajes` WRITE;
/*!40000 ALTER TABLE `mensajes` DISABLE KEYS */;
INSERT INTO `mensajes` VALUES (1,'hola',22),(2,'muy buen producto!',28),(3,'holaa',30),(4,'hola',26),(5,'hola',26);
/*!40000 ALTER TABLE `mensajes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ordenes`
--

DROP TABLE IF EXISTS `ordenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ordenes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total` decimal(10,2) NOT NULL,
  `estado` enum('pendiente','procesando','enviado','entregado') NOT NULL DEFAULT 'pendiente',
  `direccionEnvio` varchar(255) NOT NULL,
  `fechaOrden` datetime NOT NULL,
  `idCliente` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idCliente` (`idCliente`),
  CONSTRAINT `ordenes_ibfk_1` FOREIGN KEY (`idCliente`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ordenes`
--

LOCK TABLES `ordenes` WRITE;
/*!40000 ALTER TABLE `ordenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `ordenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `stock` int NOT NULL,
  `imgUrl` json NOT NULL,
  `tipoMascota` varchar(255) NOT NULL,
  `fechaCreacion` datetime NOT NULL,
  `idCategoria` int NOT NULL,
  `oferta` tinyint(1) DEFAULT '0',
  `descuento` int DEFAULT '0',
  `estado` tinyint(1) NOT NULL DEFAULT '1',
  `destacado` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `idCategoria` (`idCategoria`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (11,'Alimento Seco - Old Prince','Pelota resistente para jugar con perros de todos los tamaños.',18500.00,10,'[\"/uploads/1759357362197-742365558.webp\"]','Perro','2025-06-23 17:17:35',2,1,15,0,0),(13,'Alimento húmedo - PRO PLAN','Alimento húmedo premium para gatos adultos, sabor pollo.',3100.00,20,'[\"/uploads/1759345971745-870491580.webp\"]','Gato','2025-06-23 17:22:31',2,1,10,1,0),(14,'Collar Marvel','Collar Marvel Premium para Perros ¡Sumale superpoderes al look de tu perro con este collar Marvel Premium! Inspirado en los héroes más icónicos del universo Marvel, combina diseño y funcionalidad para que tu mascota luzca genial y se sienta cómoda. Características destacadas: Diseño exclusivo con licencia oficial de Marvel Material resistente y cómodo para el uso diario Hebilla segura y fácil de colocar Ideal para paseos con estilo Completá el combo con la correa y arnés a juego para lograr el conjunto perfecto. ¡Tu perro se va a robar todas las miradas!',12550.00,15,'[\"/uploads/1759345808516-875393118.png\", \"/uploads/1759345808521-281592229.png\", \"/uploads/1759345808529-204807593.png\"]','Perro','2025-06-23 17:25:56',1,1,10,1,0),(15,'Ratón ','Ratón de peluche con sonido para estimular el instinto de caza de tu gato.',17250.00,5,'[\"/uploads/1759345584403-482751855.webp\"]','Gato','2025-06-23 17:28:12',3,1,20,0,0),(16,'Pretales','Arnés cómodo y seguro con correa para pasear gatos.',6500.00,10,'[\"/uploads/1759345576654-271813051.webp\", \"/uploads/1759345576654-176476399.webp\"]','Gato','2025-06-23 17:30:08',1,0,0,1,0),(22,'Rascador','Tamaño único. 45cm\r\n',39500.00,5,'[\"/uploads/1759345563959-240049928.png\"]','gato','2025-09-29 18:50:33',1,0,0,1,1),(25,'Galletitas Cholitas','Paquete de 500 Gr',4000.00,10,'[\"/uploads/1759506335320-590977542.webp\"]','Perro','2025-10-03 15:45:35',2,1,10,1,0),(26,'Snacks Whiskas','Sabor Salmón - 40 Grs',2500.00,5,'[\"/uploads/1759506878550-821821231.webp\", \"/uploads/1759506878551-973682849.webp\", \"/uploads/1759506878554-821664330.webp\"]','Gato','2025-10-03 15:54:38',2,0,0,1,1),(27,'Pipeta - Power Ultra','1 Pipeta - Peso: 11-20Kg',5500.00,20,'[\"/uploads/1759508022009-214896573.png\"]','Perro','2025-10-03 16:13:42',11,0,0,1,1),(28,'Bocaditos - Golocan','Los sabrosos Bocaditos Finos Golocan de Chocolate, Carne y Pollo son semi húmedos y de textura blanda, ideales para gratificar a tu perro de una manera saludable. 500gr',11500.00,20,'[\"/uploads/1759772803242-689657602.png\"]','Perro','2025-10-06 17:46:43',2,0,0,1,1),(29,'Soga','Con nudos para tirar y forcejear con su perro.',13500.00,10,'[\"/uploads/1760464557195-651443470.png\", \"/uploads/1760464557200-175744953.png\"]','Perro','2025-10-14 17:55:57',3,0,0,1,1),(30,'Pelota con Soga','Con una cuerda de un material suave, que ayudará a tu perro a eliminar el sarro y a proteger su salud dental',15250.00,15,'[\"/uploads/1760464669047-84921673.png\"]','Perro','2025-10-14 17:57:49',3,1,10,1,0),(31,'Pelota','jjj',12500.00,10,'[\"/uploads/1760483371948-300557276.png\"]','Perro','2025-10-14 23:09:31',3,0,0,0,0),(32,'Alimento - Old Prince Novel','El Alimento Old Prince Novel Cordero y Arroz Perro Adulto Mediano Y Grande, aporta un correcto equilibrio entre el nivel, la calidad y el origen de las proteínas. Hecho con proteínas de origen no convencional que minimizan las probabilidades de alergias alimentarias y cutáneas. 3 kilos',18700.00,20,'[\"/uploads/1762269440152-184288961.webp\"]','Perro','2025-11-04 15:17:20',2,0,0,1,0),(33,'Alimento - Royal Canin Mini','Alimento para perros adultos de talla pequeña (peso adulto hasta 10 kg), de 10 meses a 8 años de edad. Royal Canin Mini Adulto contribuye a mantener un peso saludable en perros de talla pequeña, cubriendo sus elevadas necesidades energéticas. 1 kilo',12150.00,20,'[\"/uploads/1762270490101-540700369.webp\", \"/uploads/1762270551812-237017743.webp\", \"/uploads/1762270570752-1591564.webp\", \"/uploads/1762270570752-450087823.webp\", \"/uploads/1762270570754-5540543.webp\"]','Perro','2025-11-04 15:34:50',2,0,0,1,0),(34,'Alimento - Pro Plan','Purina Pro Plan provee nutrición de avanzada que ayuda a los perros de razas pequeñas a mantenerse fuertes y llenos de vitalidad. A su vez, también ayuda a otras cosas claves en el cuidado de la mascota, tales como reforzar el sistema inmune, fortalecer la microflora intestinal y reforzar la barrera cutánea.Para satisfacer las necesidades nutricionales específicas de los perros de razas pequeñas, PRO PLAN® ha desarrollado OptiHealth Razas Pequeñas, una fórmula que ofrece nutrición concentrada con óptimos niveles de proteínas (29%) y grasas (17%). 7,5kg',68900.00,10,'[\"/uploads/1762273191703-735130781.png\", \"/uploads/1762273191707-161558147.png\", \"/uploads/1762273191712-497822632.png\"]','Perro','2025-11-04 15:38:49',2,0,0,1,0),(35,'Alimento - Excellent Skin Care ','Purina Excellent Adulto Skin Care con cordero es un alimento balanceado completo para perros adultos de todos los tamaños con piel sensible. Su fórmula se basa en el exclusivo sistema smart nutrition (creado por Purina), el cual mediante una nutrición balanceada aporta múltiples beneficios provenientes de sus componentes de alta calidad, manteniendo a tu perro con un excelente estado de salud. Este alimento está compuesto con un 24% de proteína y un 11% de grasa. 3kg',19400.00,10,'[\"/uploads/1762270882276-762056360.webp\"]','Perro','2025-11-04 15:41:22',2,0,0,1,0),(36,'Alimento - Eukanuba Small Breed','\r\nEukanuba Puppy Small Breed es un alimento balanceado completo para cachorros entre 1 y 12 meses de edad y de razas pequeñas como Caniche, Yorkshire Terrier, Chihuahua, Daschund, Maltes y otras razas o perros mestizos que en su etapa adulta pesen menos de 10 kg. 1kg',9250.00,30,'[\"/uploads/1762271106904-35315124.webp\", \"/uploads/1762271437450-131606302.webp\", \"/uploads/1762271437456-751248823.webp\", \"/uploads/1762271437457-121740221.webp\", \"/uploads/1762271437458-560844101.webp\"]','Perro','2025-11-04 15:45:06',2,0,0,1,1),(37,'Cuerda con Pelota','-',16500.00,15,'[\"/uploads/1762271811072-539491547.png\"]','Perro','2025-11-04 15:56:51',3,1,5,1,0),(38,'Pelota Beepaw','La pelota Beepaw BALL-E es un juguete interactivo diseñado para estimular física y mentalmente a tu mascota. Con dos modos de juego (normal y modo inteligente), se mueve de forma aleatoria para mantener el interés y fomentar la actividad. Su cubierta de silicona es resistente a rasguños y mordidas. Ideal para gatos y perros pequeños. Recargable por USB-C y resistente a salpicaduras (no sumergible). Características: Diámetro: 4,3 cm Dos modos de juego: continuo o inteligente Recargable (incluye cable USB-C) Cubierta de silicona antideslizante y resistente Materiales no tóxicos Apta para interiores y exteriores Ideal para gatos y perros pequeños de todas las edades Incluye: 1 pelota interactiva Beepaw BALL-E 1 cable USB-C',16700.00,5,'[\"/uploads/1762272366941-941468710.png\", \"/uploads/1762272366945-953604526.png\", \"/uploads/1762272366954-461046988.png\", \"/uploads/1762272366962-904748129.png\"]','Gato','2025-11-04 16:06:06',3,0,0,1,0),(39,'Varita con bola de lana','-',8600.00,15,'[\"/uploads/1762272564896-646956706.png\", \"/uploads/1762272564899-937605583.png\"]','Gato','2025-11-04 16:09:24',3,0,0,1,0),(40,'Raton Saltarin','El Juguete Cancat Ratón Saltarín, combina texturas y materiales como hilos y papeles que permiten despertar la imaginación, potenciar la capacidad y sobre todo liberar su estrés. El movimiento que genera el juguete gracias al resorte, motiva el instinto de cazador de tu gato, para que se divierta siempre al máximo.',15540.00,10,'[\"/uploads/1762272723297-694861995.webp\", \"/uploads/1762272723298-821659157.webp\", \"/uploads/1762272723298-506263719.webp\"]','Gato','2025-11-04 16:12:03',3,0,0,1,0),(41,'Ratón','-',4600.00,10,'[\"/uploads/1762272792855-749280324.png\"]','Gato','2025-11-04 16:13:12',3,0,0,1,0),(42,'Pack de peces','El Juguete Rascals Pack de Peces con Hierba Gatera, está pensado para que tu gato pueda divertirse y jugar en todo momento, logrando así una vida alegre y libre de estrés. Es un peluche de excelente calidad, con un diseño divertido y un interior con catnip para mantener entretenido a tu gato por aún más tiempo.',13900.00,25,'[\"/uploads/1762273016678-178720364.webp\", \"/uploads/1762273016678-388782971.webp\"]','Gato','2025-11-04 16:16:56',3,0,0,1,0),(43,'Alimento - Pro Plan Gato ','Alimento completo y balanceado para gatos de 7 o más años. Es una tecnología exclusiva, formulada con una novedosa mezcla de aminoácidos, antioxidantes naturales, vitaminas del complejo B y omega 3 y 6, para ayudar a proteger y mantener la actividad cerebral y retrasar los signos del envejecimiento de tu gato. 7,5kg',10850.00,5,'[\"/uploads/1762273793699-517717503.png\", \"/uploads/1762273793704-445447548.png\", \"/uploads/1762273793709-206557484.png\"]','Gato','2025-11-04 16:29:53',2,0,0,1,0),(44,'Alimento - Excellent Gato Adulto','Excellent Gato Chicken & Rice es un alimento completo y equilibrado especialmente formulado para gatos adultos. Con pollo como fuente principal de proteínas y arroz como carbohidrato de fácil digestión, esta fórmula promueve una digestión saludable y un pelaje brillante. Su combinación de nutrientes esenciales, como vitaminas, minerales y antioxidantes, apoya el sistema inmunológico y la salud general del gato. Además, su contenido adecuado de proteínas y grasas favorece el mantenimiento del peso corporal ideal y el desarrollo muscular. Ideal para gatos con actividad moderada, Excellent Gato Chicken & Rice ofrece una nutrición de alta calidad para una vida sana y activa. 1kg',10800.00,10,'[\"/uploads/1762274192285-923491319.webp\"]','Gato','2025-11-04 16:36:32',2,1,15,1,0),(45,'Alimento - Royal Canin Kitten','Alimento para gatos, especial para gatitos en su segunda etapa de crecimiento, desde los 4 hasta los 12 meses de edad. Royal Canin Kitten brinda una tolerancia digestiva reforzada gracias a proteínas de alta digestibilidad (L.I.P.*) y prebióticos (incluyendo FOS). Ayuda a reforzar las defensas naturales del gatito en su segunda etapa de crecimiento, gracias a un complejo patentado de antioxidantes, que incluye vitamina E. Esto se debe a que durante este período clave, el sistema inmunológico del gatito se desarrolla progresivamente. Además, contribuye a un crecimiento saludable, ya que presenta un contenido adaptado de proteínas, vitaminas y minerales incluyendo vitamina D y calcio, y un elevado contenido energético que se adapta a este período de crecimiento intenso del gatito. 400grs',11000.00,25,'[\"/uploads/1762274297926-119487020.png\", \"/uploads/1762274297932-639194288.webp\", \"/uploads/1762274297933-161467264.webp\", \"/uploads/1762274297935-885664988.webp\"]','Gato','2025-11-04 16:38:17',2,0,0,1,1),(46,'Pipeta - Frontline Spot-On','Protección Efectiva contra Pulgas y Garrapatas ¡Mantené a tu perro protegido y libre de parásitos! Frontline Spot-On es una pipeta antiparasitaria de uso tópico desarrollada por Boehringer Ingelheim, indicada para el tratamiento y prevención de infestaciones por pulgas, garrapatas y piojos masticadores en perros. Su principio activo, el Fipronil, actúa eliminando los parásitos por contacto, brindando una protección prolongada. Beneficios clave: Elimina pulgas, garrapatas y piojos por contacto, sin necesidad de que piquen. Efecto residual prolongado: hasta 2 meses contra pulgas y 1 mes contra garrapatas. Apto para perros a partir de las 8 semanas de edad y más de 2 kg de peso. Seguro para hembras gestantes y lactantes. ',10400.00,25,'[\"/uploads/1762274862050-483340584.png\"]','Perro','2025-11-04 16:47:42',11,0,0,1,0),(47,'Pipeta - Frontline Spot On','Protección Efectiva contra Pulgas y Garrapatas ¡Mantené a tu gato protegido y libre de parásitos! Frontline Spot-On es una pipeta antiparasitaria de uso tópico desarrollada por Boehringer Ingelheim, indicada para el tratamiento y prevención de infestaciones por pulgas (Ctenocephalides spp.), garrapatas (Ixodes ricinus, Ixodes scapularis, Dermacentor variabilis, Rhipicephalus sanguineus) y piojos masticadores (Felicola subrostratus) en gatos. Su principio activo, el Fipronil, actúa eliminando los parásitos por contacto, brindando una protección prolongada. Beneficios clave: Elimina pulgas, garrapatas y piojos por contacto, sin necesidad de que piquen. Efecto residual prolongado: hasta 5 semanas contra pulgas y 4 semanas contra garrapatas. Apto para gatos a partir de las 8 semanas de edad y más de 1 kg de peso. Seguro para hembras gestantes y lactantes.',10400.00,15,'[\"/uploads/1762275833035-333842134.png\"]','Gato','2025-11-04 17:03:53',11,0,0,1,0),(48,'Arnés - Marvel','Enganche de metal resistente para correa o para añadir un flasher. - Detalle decorativo con Logo. - Impresion por todo el material Material: 100% Poliéster Nylon\r\n\r\n',30000.00,15,'[\"/uploads/1762277202119-562046737.webp\"]','Perro','2025-11-04 17:26:42',1,1,5,1,0),(49,'Collar - Star Wars','Collar Star Wars Premium para Perros ¡Que la fuerza acompañe cada paseo! Este collar premium de Star Wars es perfecto para los fanáticos de la saga y sus mascotas. Con un diseño exclusivo y materiales resistentes, tu perro va a lucir con estilo galáctico y máxima comodidad. Beneficios destacados Estampado oficial de Star Wars con diseño reversible Fabricado en nailon poliéster de doble capa para mayor resistencia Hebilla segura y fácil de ajustar Aro metálico para enganchar correa o chapita identificatoria Ideal para uso diario, cómodo y durable Completá el look combinándolo con la correa y el arnés Star Wars Premium para un estilo que destaca en cualquier galaxia. ¡Un accesorio ideal para todo perro fan de la saga!',17900.00,10,'[\"/uploads/1762277297496-933601309.png\", \"/uploads/1762277297507-85089380.png\", \"/uploads/1762277297524-787911916.png\"]','Perro','2025-11-04 17:28:17',1,0,0,1,1),(50,'Correa - Disney Minnie','La Correa Disney Minnie, es resistente gracias a su composición de doble capa de nylon. Además de su diseño divertido, cuenta con un anillo en la zona de agarre, pensado para poder colgar el dispenser de bolsitas.',23500.00,5,'[\"/uploads/1762277344445-422484480.webp\", \"/uploads/1762277344447-675272708.webp\"]','Perro','2025-11-04 17:29:04',1,0,0,1,0),(51,'Mochila/Transportador','La mochila Beepaw es ideal para transportar a tu gato de forma segura y cómoda. Su cúpula transparente estilo burbuja permite a tu mascota observar el entorno durante el viaje, reduciendo el estrés. Fabricada con materiales resistentes, cuenta con buena ventilación, correas acolchadas y un diseño liviano y moderno. Características: Visor panorámico tipo burbuja resistente a impactos Malla lateral para mayor ventilación Correas ajustables y acolchadas Espacio cómodo para gatos pequeños y medianos Medidas: 44 x 30 x 17 cm Ideal para paseos, viajes o visitas al veterinario',39000.00,5,'[\"/uploads/1762277660534-190294020.png\"]','Gato','2025-11-04 17:34:20',1,0,0,1,0),(52,'Arnes y Collar - Wild','-',45000.00,10,'[\"/uploads/1762277726252-111074030.jpg\"]','Gato','2025-11-04 17:35:26',1,0,0,0,0),(53,'Bebedero - Catit ','El Bebedero Catit Fuente Pixi Azul Para Gatos estimula a los gatos quisquillosos a beber en posiciones ergonómicas, tiene una apariencia sorprendentemente felina y a la vez es muy ergonómica y fácil de usar. Las pequeñas patas hacen que el bebedero sea fácil de levantar para rellenarla, mientras que las lindas orejas ayudan a prevenir derrames de agua y salpicaduras, incluso la nariz y los bigotes son muy prácticos ya que sirven como una ventana retroiluminada del nivel de agua.Está equipada con un sensor que detecta cuando el nivel de agua es demasiado bajo, en ese momento la fuente se apagará automáticamente para evitar que la bomba funcione en seco y una vez que el depósito de agua esté lleno de nuevo la fuente comenzará a funcionar automáticamente. Contiene un filtro de triple acción que filtra los residuos, ablanda el agua, elimina la suciedad y neutraliza los olores.Sus medidas son 20,5 Cm de Largo x 20,5 Cm de Ancho x 17 Cm de Alto.',107800.00,5,'[\"/uploads/1762277814738-542890268.webp\", \"/uploads/1762277814738-705210940.webp\"]','Gato','2025-11-04 17:36:54',1,0,0,1,0),(54,'Comedero - Love','-',11000.00,10,'[\"/uploads/1762277849394-669392774.png\", \"/uploads/1762277849397-600306931.png\"]','Gato','2025-11-04 17:37:29',1,0,0,1,0);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rols`
--

DROP TABLE IF EXISTS `rols`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rols` (
  `id` int NOT NULL AUTO_INCREMENT,
  `codigo` varchar(50) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rols`
--

LOCK TABLES `rols` WRITE;
/*!40000 ALTER TABLE `rols` DISABLE KEYS */;
INSERT INTO `rols` VALUES (1,'SUPER_ADMIN','Administrador con todos los permisos','2025-09-25 04:23:23','2025-09-25 04:23:23'),(2,'CLIENTE','Usuario registrado en e-commerce','2025-10-03 19:07:29','2025-10-03 19:07:29'),(3,'ADMIN','Administrador normal','2025-10-06 22:14:13','2025-10-06 22:14:13');
/*!40000 ALTER TABLE `rols` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `rolId` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `rolId` (`rolId`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_10` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_100` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_101` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_102` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_103` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_104` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_105` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_106` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_107` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_108` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_109` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_11` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_110` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_111` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_112` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_113` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_114` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_115` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_116` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_117` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_118` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_119` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_12` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_120` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_121` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_122` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_123` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_124` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_125` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_126` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_127` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_128` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_129` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_13` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_130` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_131` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_132` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_133` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_134` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_135` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_136` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_137` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_138` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_139` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_14` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_140` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_141` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_142` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_143` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_144` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_145` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_146` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_147` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_148` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_149` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_15` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_150` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_151` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_16` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_17` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_18` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_19` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_2` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_20` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_21` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_22` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_23` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_24` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_25` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_26` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_27` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_28` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_29` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_3` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_30` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_31` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_32` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_33` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_34` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_35` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_36` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_37` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_38` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_39` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_4` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_40` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_41` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_42` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_43` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_44` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_45` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_46` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_47` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_48` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_49` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_5` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_50` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_51` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_52` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_53` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_54` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_55` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_56` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_57` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_58` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_59` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_6` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_60` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_61` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_62` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_63` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_64` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_65` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_66` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_67` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_68` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_69` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_7` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_70` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_71` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_72` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_73` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_74` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_75` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_76` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_77` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_78` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_79` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_8` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_80` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_81` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_82` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_83` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_84` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_85` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_86` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_87` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_88` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_89` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_9` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_90` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_91` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_92` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_93` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_94` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_95` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_96` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_97` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_98` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `usuarios_ibfk_99` FOREIGN KEY (`rolId`) REFERENCES `rols` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (6,'Joana Romay','joanaromay@gmail.com','$2b$10$eX63dsPhS2zB/iWaDpsiV.k8GDlOqWTXowMG3mt/Jnk63IHxQkqVO',1,'2025-10-03 19:29:31','2025-10-14 23:03:04','107332794864038126843',1),(8,'María Gómez','maria.gomez@example.com','$2b$10$eZYqMNBDGr9Rbixc9Tipn.RJwpa9HaSpLsKpv5./uKzi.7mLx.oqS',2,'2025-10-06 17:15:05','2025-10-10 21:33:11',NULL,1),(9,'Juan Pérez','juan.perezz@example.com','$2b$10$yWOUEjEnb5oDDoia.V6sn.d5FDiStbPs/murCajQQ/aulhjwadHgy',2,'2025-10-06 17:15:22','2025-10-27 21:34:08',NULL,0),(10,'Jaqueline Tolesano','yohhitolesano94@gmail.com','$2b$10$rpFpw5Dlj/ta5mX9tZutieEFC6N1I.p9jZoBtWbkxbr5KJKFv9FHi',3,'2025-10-06 22:15:50','2025-10-06 22:15:50',NULL,1),(13,'Luis','jjj@gmail.com','$2b$10$3BaI3hoJbjvN3eHgIiszIOeO2otWT9VRQ.wPZPnBKKxG55tPnMn4S',3,'2025-10-08 21:58:36','2025-10-14 23:19:32',NULL,0),(14,'Pedro','pedro@gmai.com','$2b$10$ap0M.rqtdohS4e/oTphL7.J.yCm7DbF3oRW2bJ2z1ICiwNDbaRIk2',3,'2025-10-09 19:59:29','2025-10-09 19:59:29',NULL,1),(15,'Pepita','pepita@gmail.com','$2b$10$JPLyk5MYIFoWY6sZsC1bUu2fB2FUErxBJXsROsaCRo7.x6aLhdxUW',3,'2025-10-14 01:22:07','2025-10-14 01:22:07',NULL,1),(16,'Pepito','pepito@gmail.com','$2b$10$Dtyw6s3fq.Jh0kg8OOkFyeGYL7Fvo8/fa4m0LvAqkADn/EL6sT/ou',3,'2025-10-14 23:20:11','2025-10-27 21:26:44',NULL,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `variantes`
--

DROP TABLE IF EXISTS `variantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `variantes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `precio` float NOT NULL,
  `idProducto` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `variantes`
--

LOCK TABLES `variantes` WRITE;
/*!40000 ALTER TABLE `variantes` DISABLE KEYS */;
/*!40000 ALTER TABLE `variantes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-05 22:59:25
