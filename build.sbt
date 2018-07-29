name := """play-getting-started"""

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.7"

libraryDependencies ++= Seq(
  jdbc,
  cache,
  "org.postgresql" % "postgresql" % "9.4-1201-jdbc41",
  ws,
  "org.jscience" % "jscience" % "4.3.1",
  "com.github.tototoshi" %% "scala-csv" % "1.3.5"

)

libraryDependencies <+= scalaVersion("org.scala-lang" % "scala-compiler" % _ )
