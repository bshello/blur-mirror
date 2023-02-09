package com.blur.blurprofile.dto;

import com.blur.blurprofile.entity.Category;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class CategoryDto {

    List<Category> categories;

    public CategoryDto(List<Category> categories) {
        this.categories = categories;
    }
}
