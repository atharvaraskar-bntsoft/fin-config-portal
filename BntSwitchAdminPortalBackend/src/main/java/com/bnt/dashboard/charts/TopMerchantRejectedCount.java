package com.bnt.dashboard.charts;

import java.util.Collections;
import java.util.List;

import com.google.common.collect.Lists;
import com.bnt.common.util.CollectionUtil;
import com.bnt.dashboard.ChartsConfig;
import com.bnt.dashboard.Content;
import com.bnt.dashboard.DashBoardData;
import com.bnt.dashboard.DashboardStats;
import com.bnt.dashboard.KeyPair;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class TopMerchantRejectedCount implements Charts<KeyPair> {

	public DashBoardData<KeyPair> buildContent(ChartsConfig chartsConfig) {
		Content<KeyPair> content = DashboardStats
				.buildContent(Lists.newArrayList(DashboardStats.Trnsactions.MERCHANT_DECLINED), chartsConfig);
		Collections.sort(content.getCoordinates(), (k1, k2) -> (Integer) k2.getValue() - (Integer) k1.getValue());
		List<KeyPair> keyPairList = content.getCoordinates();
		content.setCoordinates(CollectionUtil.getTopValuesOnlyInList(keyPairList, 5));
		return new DashBoardData<>(BLOCK_TYPE_HALF, TOP_MERCHANT_REJECTED_COUNT_DONUT_TITLE, ACTION_LINK, ACTION_TITLE,
				content);
	}
}
