import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created with IntelliJ IDEA.
 * User: shriyam
 * Date: 2/3/13
 * Time: 11:36 AM
 * To change this template use File | Settings | File Templates.
 */
public class SampleHttpRequest
{
    public static void main ( String args [] )
    {
        String response = executeGET("http://api.worldbank.org/source?per_page=20");
        System.out.println( response );
    }



    private String buildQuery( String  )

    private String executeGET( String targetURL )
    {
        URL url;
        HttpURLConnection connection = null;
        try {
            //Create connection
            url = new URL(targetURL);
            connection = (HttpURLConnection)url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Content-Type",
                    "application/x-www-form-urlencoded");

            connection.setRequestProperty("Content-Language", "en-US");

            connection.setUseCaches(false);
            connection.setDoInput(true);
            connection.setDoOutput(true);

            //Send request
//            DataOutputStream wr = new DataOutputStream (
//                    connection.getOutputStream ());
//            wr.writeBytes (urlParameters);
//            wr.flush();
//            wr.close();

            //Get Response
            InputStream is = connection.getInputStream();
            BufferedReader rd = new BufferedReader(new InputStreamReader(is));
            String line;
            StringBuilder response = new StringBuilder();
            while((line = rd.readLine()) != null) {
                response.append(line);
                response.append('\r');
            }
            rd.close();
            return response.toString();

        } catch (Exception e) {

            e.printStackTrace();
            return null;

        } finally {

            if(connection != null) {
                connection.disconnect();
            }
        }
    }

}
