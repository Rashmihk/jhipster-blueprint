package <%=packageName%>.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ReportConfiguration {

	@Value("${phoenix.report.maxRecords}")
	private int maxRecords;

	public int getMaxRecords()
	{
		return this.maxRecords;
	}

}