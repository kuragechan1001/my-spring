# ベースイメージに OpenJDK を使用（Java 17）
FROM openjdk:25-jdk-slim@sha256:39563e25964d6b49c41d418245a505bbe50f3ca90b1997239f5435dd09add0b1

# 作業ディレクトリを /app に設定（任意）
WORKDIR /app

# JARファイルをコンテナにコピー
COPY target/my-spring-app-0.0.1-SNAPSHOT.jar app.jar

# アプリケーションを実行
CMD ["java", "-jar", "app.jar"]