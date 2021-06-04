import {Component, OnInit} from '@angular/core';
import { ConfigService } from "./config/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'CI-CD-Part2';
  message: string;

  constructor(private configService: ConfigService) {
  }

  ngOnInit(): void {
    this.configService.getMessage().subscribe((data: any)=>{
      this.message = data.message
    })
  }
}
