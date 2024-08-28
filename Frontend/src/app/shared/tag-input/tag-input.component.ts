import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tag-input',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.css']
})
export class TagInputComponent {
  public tagList:string[] = [];
  currentTag:string = "";

  @ViewChild("textArea") tagInputChild:any;

  onInput(data:string)
  {
    this.currentTag = data;
  }

  onEnterClick(data:string)
  {
    this.tagInputChild.nativeElement.value = "";
    if(this.currentTag.trim() && !this.tagList.includes(this.currentTag.trim()))
      {
        this.tagList.push(this.currentTag.trim());
      }
  }

  removeTag(tag : string)
  {

    let index = -1;
    for(let i=0;i<this.tagList.length; i++)
      {
        if(this.tagList[i]==tag.trim())
          {
            index = i;
          }
      }
      if(index != -1)
        {
          this.tagList.splice(index,1);
        }
  }
}
