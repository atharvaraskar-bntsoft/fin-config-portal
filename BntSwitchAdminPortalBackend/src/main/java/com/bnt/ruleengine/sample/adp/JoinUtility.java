package com.bnt.ruleengine.sample.adp;

import java.util.List;
import java.util.stream.Collectors;

import com.bnt.bswitch.transformer.processor.FieldPart;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class JoinUtility {

	public static List<FieldPart> getListJoinFieldPart(List<JoinSourceUI> listJoinSource) {
		if (null != listJoinSource) {
			return listJoinSource.stream().map(each -> getJoinFieldPart(each)).collect(Collectors.toList());
		}
		return null;
	}

	private static FieldPart getJoinFieldPart(JoinSourceUI joinSourceUI) {
		if (null != joinSourceUI) {
			String source = null;
			String target = null;

			if (joinSourceUI.getSourceType().equalsIgnoreCase(AdpConstants.IMF)) {
				source = ImfUtility.getFinalString(joinSourceUI.getSourceImf());
				target = ImfUtility.getFinalString(joinSourceUI.getTargetImf());
			} else {
				source = joinSourceUI.getSourceText();
				// target = joinSourceUI.getTargetText();
			}
			return new FieldPart(source, target, FunctionUtility.getListFunction(joinSourceUI.getListFunction()),
					joinSourceUI.getIpc());
		}
		return null;
	}
}
