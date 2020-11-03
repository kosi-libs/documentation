import org.w3c.dom.Document
import org.w3c.dom.Element
import org.w3c.dom.Node
import org.w3c.dom.NodeList
import org.xml.sax.InputSource
import java.io.File
import java.io.StringReader
import javax.xml.parsers.DocumentBuilderFactory

fun readXml(file: File): Document {
    val dbFactory = DocumentBuilderFactory.newInstance()
    val dBuilder = dbFactory.newDocumentBuilder()
    val xmlInput = InputSource(StringReader(file.readText()))
    val doc = dBuilder.parse(xmlInput)

    return doc
}

inline fun <reified T : Node> NodeList.toList(): List<T> {
    val list = ArrayList<T>()
    for (i in 0 until length) list.add(item(i) as T)
    return list
}

fun main() {
    File("../docs").listFiles()!!
        .filter { it.name.startsWith("sitemap-") && it.name.endsWith(".xml") }
        .filterNot { it.name == "sitemap-kodein-framework.xml" }
        .forEach {
            val loc = readXml(it)
                .getElementsByTagName("url")
                .toList<Element>()
                .map { it.getElementsByTagName("loc").item(0).textContent }
                .first {
                    it.endsWith("index.html")
                }
            val (module, version) = loc.removePrefix("https://docs.kodein.org/").removeSuffix("/index.html").split("/")
            File("../docs/$module/index.html").writeText(
                """
                    <!DOCTYPE html>
                    <meta charset="utf-8">
                    <link rel="canonical" href="https://docs.kodein.org/$module/$version/index.html">
                    <script>location="$version/index.html"</script>
                    <meta http-equiv="refresh" content="0; url=$version/index.html">
                    <meta name="robots" content="noindex">
                    <title>Redirect Notice</title>
                    <h1>Redirect Notice</h1>
                    <p>The page you requested has been relocated to <a href="$version/index.html">https://docs.kodein.org/$module/$version/index.html</a>.</p>
                """.trimIndent()
            )
        }
}
