DROP DATABASE if EXISTS jaTestDB;

CREATE DATABASE jaTestDB;

USE jaTestDB;

CREATE TABLE
    `administrador` (
        `id_administrador` int (10) PRIMARY KEY NOT NULL,
        `nombre_administrador` varchar(50) NOT NULL,
        `apellido_administrador` varchar(50) NOT NULL,
        `correo_administrador` varchar(100) NOT NULL,
        `alias_administrador` varchar(25) NOT NULL,
        `clave_administrador` varchar(100) NOT NULL,
        `fecha_registro` datetime NOT NULL DEFAULT (current_timestamp())
    );

CREATE TABLE
    `categoria` (
        `id_categoria` int (10) PRIMARY KEY NOT NULL,
        `nombre_categoria` varchar(50) NOT NULL,
        `descripcion_categoria` varchar(250) DEFAULT null,
        `imagen_categoria` varchar(25) NOT NULL
    );

CREATE TABLE
    `cliente` (
        `id_cliente` int (10) PRIMARY KEY NOT NULL,
        `nombre_cliente` varchar(50) NOT NULL,
        `apellido_cliente` varchar(50) NOT NULL,
        `dui_cliente` varchar(10) NOT NULL,
        `correo_cliente` varchar(100) NOT NULL,
        `telefono_cliente` varchar(9) NOT NULL,
        `direccion_cliente` varchar(250) NOT NULL,
        `nacimiento_cliente` date NOT NULL,
        `clave_cliente` varchar(100) NOT NULL,
        `estado_cliente` tinyint (1) NOT NULL DEFAULT 1,
        `fecha_registro` date NOT NULL DEFAULT (current_timestamp())
    );

CREATE TABLE
    `detalle_pedido` (
        `id_detalle` int (10) PRIMARY KEY NOT NULL,
        `id_producto` int (10) NOT NULL,
        `cantidad_producto` smallint (6) NOT NULL,
        `precio_producto` decimal(5, 2) NOT NULL,
        `id_pedido` int (10) NOT NULL
    );

CREATE TABLE
    `pedido` (
        `id_pedido` int (10) PRIMARY KEY NOT NULL,
        `id_cliente` int (10) NOT NULL,
        `direccion_pedido` varchar(250) NOT NULL,
        `estado_pedido` ENUM ('Pendiente', 'Finalizado', 'Entregado', 'Anulado') NOT NULL,
        `fecha_registro` date NOT NULL DEFAULT (current_timestamp())
    );

CREATE TABLE
    `producto` (
        `id_producto` int (10) PRIMARY KEY NOT NULL,
        `nombre_producto` varchar(50) NOT NULL,
        `descripcion_producto` varchar(250) NOT NULL,
        `precio_producto` decimal(5, 2) NOT NULL,
        `existencias_producto` int (10) NOT NULL,
        `imagen_producto` varchar(25) NOT NULL,
        `id_categoria` int (10) NOT NULL,
        `estado_producto` tinyint (1) NOT NULL,
        `id_administrador` int (10) NOT NULL,
        `fecha_registro` date NOT NULL DEFAULT (current_timestamp())
    );

ALTER TABLE `detalle_pedido` ADD CONSTRAINT `detalle_pedido_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`) ON UPDATE CASCADE;

ALTER TABLE `detalle_pedido` ADD CONSTRAINT `detalle_pedido_ibfk_2` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`) ON UPDATE CASCADE;

ALTER TABLE `pedido` ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `cliente` (`id_cliente`) ON UPDATE CASCADE;

ALTER TABLE `producto` ADD CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`) ON UPDATE CASCADE;

ALTER TABLE `producto` ADD CONSTRAINT `producto_ibfk_2` FOREIGN KEY (`id_administrador`) REFERENCES `administrador` (`id_administrador`) ON UPDATE CASCADE;