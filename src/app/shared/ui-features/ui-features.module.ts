import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { SharedModule, MenuItem } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { ListboxModule } from 'primeng/listbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { PanelModule } from 'primeng/panel';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { TabViewModule } from 'primeng/tabview';
import { FocusTrapModule } from 'primeng/focustrap';
import { CheckboxModule } from 'primeng/checkbox';
import { TreeTableModule } from 'primeng/treetable';
import { TreeModule } from 'primeng/tree';
import { ToolbarModule } from 'primeng/toolbar';
import { StepsModule } from 'primeng/steps';
import {CardModule} from 'primeng/card';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    ConfirmDialogModule,
    ButtonModule,
    DialogModule,
    SidebarModule,
    TableModule,
    FileUploadModule,
    ToastModule,
    DropdownModule,
    MenubarModule,
    ListboxModule,
    RadioButtonModule,
    PanelModule,
    AccordionModule,
    CalendarModule,
    TabViewModule,
    FocusTrapModule,
    CheckboxModule,
    TreeTableModule,
    TreeModule,
    MessageModule,
    ToolbarModule,
    SharedModule,
    StepsModule,
    CardModule,
    SelectButtonModule,
    InputTextModule,
    InputTextareaModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    ButtonModule,
    ConfirmDialogModule,
    DialogModule,
    SidebarModule,
    TableModule,
    FileUploadModule,
    ToastModule,
    DropdownModule,
    MenubarModule,
    ListboxModule,
    RadioButtonModule,
    PanelModule,
    AccordionModule,
    CalendarModule,
    TabViewModule,
    FocusTrapModule,
    CheckboxModule,
    TreeTableModule,
    TreeModule,
    MessageModule,
    ToolbarModule,
    SharedModule,
    StepsModule,
    CardModule,
    SelectButtonModule,
    InputTextModule,
    InputTextareaModule
  ],
  providers: [],
})
export class UiFeaturesModule {}
