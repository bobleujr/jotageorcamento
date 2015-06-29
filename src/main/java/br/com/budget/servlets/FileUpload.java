package br.com.budget.servlets;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.logging.Logger;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItemIterator;
import org.apache.commons.fileupload.FileItemStream;
import org.apache.commons.fileupload.servlet.ServletFileUpload;

import br.com.budget.dao.FileDAO;
import br.com.budget.entities.MyFile;

import com.google.appengine.api.datastore.Key;
import com.google.gson.Gson;


public class FileUpload extends HttpServlet {
	  /**
	 * 
	 */
	private static final Logger log =
	      Logger.getLogger(FileUpload.class.getName());

	  @Override
	  public void doPost(HttpServletRequest req, HttpServletResponse res)
	      throws ServletException, IOException {
	    try {
	      ServletFileUpload upload = new ServletFileUpload();
	      res.setContentType("text/plain");

	      FileItemIterator iterator = upload.getItemIterator(req);
	      while (iterator.hasNext()) {
	        FileItemStream item = iterator.next();
	        InputStream stream = item.openStream();

	        if (item.isFormField()) {
	          log.warning("Got a form field: " + item.getFieldName());
	        } else {
	          log.warning("Got an uploaded file: " + item.getFieldName() +
	                      ", name = " + item.getName());

	          // You now have the filename (item.getName() and the
	          // contents (which you can read from stream). Here we just
	          // print them back out to the servlet output stream, but you
	          // will probably want to do something more interesting (for
	          // example, wrap them in a Blob and commit them to the
	          // datastore).
	          int len;
	          byte[] buffer = new byte[512];
	          
	          ByteArrayOutputStream baout = new ByteArrayOutputStream();
	          while ((len = stream.read(buffer, 0, buffer.length)) != -1) {
	            baout.write(buffer, 0, len);
	          }

	          MyFile file = new MyFile();
	          
	          file.setFile(buffer);
	          file.setName(item.getName());
				
	          FileDAO dao = new FileDAO();
	          Key key = dao.addItem(file);	

	          String keyr = new Gson().toJson(key);
	          res.getWriter().write(keyr);

	        }
	      }
	    } catch (Exception ex) {
	      throw new ServletException(ex);
	    }
	  }
	  
		  
	}
