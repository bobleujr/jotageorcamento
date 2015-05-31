package br.com.budget.dao;

import java.util.List;

import org.joda.time.DateTime;
import org.joda.time.LocalDate;

import br.com.budget.entities.Item;

import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.FetchOptions;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
public class ItemDAO {
	
	
	public Key addItem(Item item){
		DateTime now = new DateTime();
		LocalDate today = now.toLocalDate();
		
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();


		Entity object = new Entity("item");

		object.setProperty("name", item.getName());
		object.setProperty("description", item.getDescription());
		object.setProperty("description1", item.getDescription2());
		object.setProperty("description2", item.getDescription3());
		object.setProperty("price", item.getPrice());
		object.setProperty("price1", item.getPrice2());
		object.setProperty("price2", item.getPrice3());
		object.setProperty("lastUpdate", today.toDate());
		
		Key key = datastore.put(object);
		
		return key;
	}
	
	public List<Entity> listItem(){
		DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
			 
		Query q = new Query("item");
		
		PreparedQuery pd = datastore.prepare(q);
	 	List<Entity> items = pd.asList(FetchOptions.Builder.withDefaults());
			
	 	return items;
	}
}
