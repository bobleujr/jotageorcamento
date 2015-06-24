package br.com.budget.dao;

import org.joda.time.DateTime;
import org.joda.time.LocalDate;

import br.com.budget.entities.MyFile;

import com.google.appengine.api.datastore.Blob;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.Key;

public class FileDAO {
	public Key addItem(MyFile file){
		DateTime now = new DateTime();
		LocalDate today = now.toLocalDate();
		
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();


		Entity object = new Entity("file");

		Blob blob = new Blob(file.getFile());
		
		
		object.setProperty("file", blob);
		object.setProperty("name", file.getName());
		object.setProperty("dateAdded", today.toDate());
		
		Key key = datastore.put(object);
		
		return key;
	}

}
