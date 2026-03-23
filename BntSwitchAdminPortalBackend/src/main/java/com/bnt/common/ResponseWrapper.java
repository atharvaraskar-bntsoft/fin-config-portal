package com.bnt.common;

/**************************
 * @author vaibhav.shejol *
 **************************/

public class ResponseWrapper {

    private int pageNo;

    private long totalRecords;

    private long totalFilterRecords;

    private Object content;

    public int getPageNo() {
        return pageNo;
    }

    public void setPageNo(int pageNo) {
        this.pageNo = pageNo;
    }

    public long getTotalRecords() {
        return totalRecords;
    }

    public void setTotalRecords(long totalPage) {
        this.totalRecords = totalPage;
    }

    public Object getContent() {
        return content;
    }

    public void setContent(Object content) {
        this.content = content;
    }

    public long getTotalFilterRecords() {
        return totalFilterRecords;
    }

    public void setTotalFilterRecords(long totalFilterRecords) {
        this.totalFilterRecords = totalFilterRecords;
    }

    @Override
    public String toString() {
        return "PageJPAData [pageNo=" + pageNo + ", totalRecords=" + totalRecords + ", content=" + content + "]";
    }

}
