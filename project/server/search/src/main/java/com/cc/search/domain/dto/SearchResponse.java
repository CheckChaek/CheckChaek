package com.cc.search.domain.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class SearchResponse {
    String version;
    String logo;
    String title;
    String link;
    String pubDate;
    String imageUrl;
    int totalResults;
    int startIndex;
    int itemsPerPage;
    String query;
    int searchCategoryId;
    String searchCategoryName;
    List<BookDto> item;

    @Override
    public String toString() {
        return "SearchResponse{" +
                "version='" + version + '\'' +
                ", logo='" + logo + '\'' +
                ", title='" + title + '\'' +
                ", link='" + link + '\'' +
                ", pubDate='" + pubDate + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", totalResults=" + totalResults +
                ", startIndex=" + startIndex +
                ", itemsPerPage=" + itemsPerPage +
                ", query='" + query + '\'' +
                ", searchCategoryId=" + searchCategoryId +
                ", searchCategoryName='" + searchCategoryName + '\'' +
                ", item=" + item +
                '}';
    }
}
