import java.io.{BufferedWriter, File, FileWriter}

import com.github.tototoshi.csv.{CSVParser, CSVReader, CSVWriter}
import org.junit.Assert
import org.junit.Before
import org.junit.Test

import scala.util.Try


class DAO {

  @Test
  def run(): Unit ={
    totalCount()

  }

  def totalCount(): Unit = {
    val count = CSVReader.open(new File("test/resources/Chicago_Crimes_2012_to_2017.csv")).all().size
    val bw = writeToFile("test/resources/totalCount.txt")
    bw.write(count)
    bw.close()
  }

  def countPerMonth(): Unit = {
    val reader = CSVReader.open(new File("test/resources/Chicago_Crimes_2012_to_2017.csv"))
    val stats = scala.collection.mutable.Map[String, Int]()
    reader.iteratorWithHeaders.
      map(x => x("Date")).
      map(date => date.drop(6).take(4) + "-" + date.take(2)).
      foreach({
        d =>
          if (stats.get(d).isDefined) stats.put(d, stats(d) + 1)
          else stats.put(d, 1)
      })

    val file = new File("test/resources/stats.csv")
    val bw = new BufferedWriter(new FileWriter(file))
    bw.write("yearMonth,numCrimes\n")
    stats.toList.sorted.foreach(tuple => bw.write(s"${tuple._1},${tuple._2}\n"))
    Try(bw.close())
  }

  def writeToFile(filename: String): BufferedWriter = {
    new BufferedWriter(new FileWriter(new File(filename)))
  }

}
