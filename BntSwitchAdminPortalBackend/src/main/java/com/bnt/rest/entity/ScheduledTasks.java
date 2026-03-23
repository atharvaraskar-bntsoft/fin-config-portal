package com.bnt.rest.entity;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Iterator;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicInteger;

import jakarta.annotation.PostConstruct;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.bnt.dashboard.DashboardStats;
import com.bnt.rest.dto.DashBoardDto;
import com.bnt.rest.jpa.repository.SettingPersistenceHelper;
import com.bnt.rest.repository.DashBoardRepository;

/**************************
 * @author vaibhav.shejol *
 **************************/

@Component
@EnableScheduling
public class ScheduledTasks {

	private static final Logger logger = LogManager.getLogger(ScheduledTasks.class);

	private static final int FETCH_FOR_LAST_HOURS = 24;
	private static final int INITIAL_FETCH_INTERVAL_BUCKET_SIZE = 2;
	private long systemLeg = 0;

	@Autowired
	private DashBoardRepository repository;

	@Autowired
	private SettingPersistenceHelper settingHelper;

	AtomicInteger count = new AtomicInteger(0);

	private Timestamp timestamp = new Timestamp(Calendar.getInstance().getTimeInMillis());

	public ScheduledTasks() {
		logger.info("inside ScheduledTasks()..");
	}

	@Scheduled(fixedDelayString = "${dashboard.schedular.time}")
	public void fetchDBRecords() {
		try {
			Timestamp current = new Timestamp(Calendar.getInstance().getTimeInMillis());
			execute(timestamp, current);
			timestamp = current;
		} catch (Exception e) {
			logger.error(e);
		}
	}

	private void execute(Timestamp start, Timestamp end) {
		Iterator<DashBoardDto> data = repository.fetchTxnLogEntity(new Timestamp(start.getTime() + systemLeg),
				new Timestamp(end.getTime() + systemLeg));
		while (data.hasNext()) {
			count.getAndIncrement();
			try {
				DashboardStats.add(data.next());
			} catch (Exception e) {
				logger.error(e);
			}
		}
		DashboardStats.cleanup();
	}

	@PostConstruct
	private void initialLoad() {
		this.systemLeg = ((Timestamp) (settingHelper.getCurrentDateTime())[0]).getTime() - System.currentTimeMillis();
		Calendar calendar = Calendar.getInstance();
		ExecutorService service = Executors
				.newFixedThreadPool(FETCH_FOR_LAST_HOURS / INITIAL_FETCH_INTERVAL_BUCKET_SIZE);
		for (int i = 0; i < 24; i += INITIAL_FETCH_INTERVAL_BUCKET_SIZE) {
			Timestamp current = new Timestamp(calendar.getTimeInMillis());
			calendar.add(Calendar.HOUR, -(INITIAL_FETCH_INTERVAL_BUCKET_SIZE));
			Timestamp lastTimestamp = new Timestamp(calendar.getTimeInMillis());
			service.submit(new FetchTask(new Timestamp(lastTimestamp.getTime()), new Timestamp(current.getTime())));
		}
	}

	class FetchTask implements Runnable {

		final Timestamp current;
		final Timestamp last;

		public FetchTask(final Timestamp last, final Timestamp current) {
			this.last = last;
			this.current = current;
		}

		@Override
		public void run() {
			execute(last, current);
		}
	}
}
