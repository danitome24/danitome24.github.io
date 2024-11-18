---
layout: post
title: "Facturini (4): CI Para Dormir Tranquilos"
date: 2019-08-03T12:39:01+02:00
description: Añadimos CI para poder ir haciendo cambios y estar seguro que no hemos roto nada.
---

En esto post vamos a ver que es y como nos va a ayudar la integración continua (CI) en la refactorización de Facturini.

## ¿Que es la CI?

Integración continua (CI) es una práctica en la que los desarrolladores integran código en un mismo repositorio y por cada cambio que se haga (Merge/Pull request) se lanzarán una serie de test y/o procesos automáticos. Esta práctica permite siempre asegurar que cada cambio que se aplica en un repositorio, tenga que pasar los test definidos y que si estos no pasan, entonces no se puedan integrar los cambios. Así, aseguramos que todas las integraciones, no rompan lo que ya está escrito anteriormente.

En nuestro caso la CI nos ayudará a que cuando hagamos un cambio en el código, aseguremos que lo anterior hecho siga funcionando correctamente y, que por error, no integremos cambios que rompan el correcto funcionamiento de nuestra aplicación.

## Gitlab-ci al rescate

Herramientas de CI hay diversas y muy buenas: Jenkins, Travis CI, Gitlab CI, Circle CI, etc. Todas ellas ofrecen un software que nos permite lanzar pipelines para testear nuestro código por cada push que hagamos a nuestro repositorio. Yo solamente he tenido experiencia con Travis CI y con Gitlab CI. La primera la he usado con la integración de Github y la segunda es la que uso actualmente en el trabajo. Personalmente, Gitlab CI es una muy buena herramienta si trabajas con Gitlab como software de desarrollo colaborativo. Se integra todo en la misma plataforma y tiene features muy pero que muy interesantes. Por lo tanto, como estoy acostumbrado a ella y tengo el repositorio en gitlab, me decanto por usar esta plataforma como tool de integración continua.

## Configuración

Para configurar gitlab-ci simplemente tienes que crear un fichero `.gitlab-ci.yml` indicando los pasos que tendrá que ejecutar la CI por cada push que nosotros hagamos a nuestro repositorio. Antes pero vamos a poner los conceptos básicos que usa gitlab para estar más contextualizados.

**Pipeline**: Conjunto de _Jobs_ que se ejecutaran para cada push. Engloba todos los pasos que ejecutará la CI por cada push que hagamos al repositorio.

**Jobs**: Son los encargados de ejecutar un proceso o script definido por nosotros. Un ejemplo de _Job_ podría ser ejecutar los test de _Phpunit_ o de _Behat_ como es en nuestro caso.

**Stages**: Nos permite ordenar los _Jobs_ que queremos ejecutar en el orden que nosotros queramos. Un ejemplo clásico sería:

1. Preparación de dependencias.
1. Ejecución de los test.
1. Deploy en producción.

Todos estos pasos serían diferentes _stages_ y cada _job_ está ligado a una de ellas. Los _Jobs_ pertenecientes a un mismo _stage_ se ejecutan en paralelo. Cuando el resultado de todos los _jobs_ de un mismo _stage_ sea correcto, se pasa al siguiente. En el caso de que haya algún problema en un stage, no se pasa al siguiente _stage_ y se detiene la ejecución de la _pipeline_.

**Runners**: Son las "máquinas" encargadas de ejecutar los _jobs_ físicamente, es decir, los runners son los encargados de ejecutar cada job y devolver a Gitlab el resultado obtenido.

Una vez aquí vamos a ver la configuración del fichero `.gitlab-ci.yml`:

```yml
stages:
  - build
  - test

services:
  - docker:dind

cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - vendor/

build:
  stage: build
  image: docker:stable
  script:
    - docker run --rm -v $(pwd):/app -w /app composer install

test:behat:
  stage: test
  image: tiangolo/docker-with-compose
  before_script:
    - cp docker/.env.dist docker/.env
    - docker-compose build
    - docker-compose up -d
    - sleep 30
    - docker-compose exec -T db mysql -u gitlabci -pdbpwd facturini < db/factura.sql
  script:
    - docker-compose exec -T php-apache vendor/bin/behat --colors
```

Lo que podemos ver en este fichero es:

```yml
stages:
  - build
  - test
```

Defino las _stages_ que habrá en mi _Pipeline_. Por el momento tendremos dos, una para preparar e instalar las dependencias y otra para ejecutar los test necesarios.

```yml
services:
  - docker:dind
```

Indicamos a Gitlab que usaré el servicio de _Docker_ dentro de la pipeline.

```yml
cache:
  key: ${CI_COMMIT_REF_SLUG}
  paths:
    - vendor/
```

La `cache` en gitlab-ci nos permite compartir aquello que queramos entre las `pipelines`. La instalación de las dependencias de Composer es algo que solamente necesitamos hacer una vez. Es una perdida de tiempo hacerlo por cada job ya que sería repetir el proceso X veces. Por lo tanto, lo defino como cache y este directorio `vendor/` se compartirá entre todos los _jobs_ de la CI.

```yml
build:
  stage: build
  image: docker:stable
  script:
    - docker run --rm -v $(pwd):/app -w /app composer install
```

El primer _job_ consiste en usar la imagen de `docker:stable` e instalar las dependencias de _Composer_ con su imagen latest. Una vez este _job_ termine, ejecutará los _jobs_ del siguiente _stage_ (test).

```yml
test:behat:
  stage: test
  image: tiangolo/docker-with-compose
  before_script:
    - cp docker/.env.dist docker/.env
    - docker-compose build
    - docker-compose up -d
    - sleep 30
    - docker-compose exec -T db mysql -u gitlabci -pdbpwd facturini < db/factura.sql
  script:
    - docker-compose exec -T php-apache vendor/bin/behat --colors
```

Último _job_ el cual se encargará de levantar un nuevo entorno de pruebas con el orquestrador `docker-compose` y ejecutará los test _Behat_. Uso la imagen `tiangolo/docker-with-compose` ya que me proporciona el servicio de `docker-compose` que necesito sin hacer falta de instalarlo. Con la etiqueta `before_script` preparo lo necesario para tener un nuevo entorno y en el `script` ejecuto los test _Behat_ que me asegurarán el correcto funcionamiento de mi aplicación.

## Gitlab

Finalmente lo que veremos en la aplicación de Gitlab cuando hacemos un push sería algo tal que:

![gitlab-ci](../assets/ci-running.png)

Podemos ver que la _Pipeline_ se está ejecutando: la primera _stage_ (build) ha sido satisfactoria y que aún le queda la segunda por ejecutar. Finalmente deberíamos ver que las _stages_ han pasado correctamente y que ya podemos hacer `merge` de nuestros cambios con la seguridad de que todo sigue funcionando correctamente.

![gitlab-ci-ok](../assets/ci-ok.png)
