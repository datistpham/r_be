#include <windows.h>
#include <commdlg.h>

#define ID_EDIT 1
#define ID_FILE_OPEN 2
#define ID_FILE_SAVE 3
#define ID_FILE_NEW 4
#define ID_EDIT_COPY 5
#define ID_APP_EXIT 0xF060
#define ID_FILE_PRINT 6
#define ID_EDIT_SELECT_ALL 7
#define IDC_MAIN_EDIT 101
#define MAX_TITLE_LENGTH 1000
#define APP_TITLE "U"
#define ID_EDIT_ZOOM 9
#define ID_EDIT_FIND 40005
#define ID_FILE_NEW_WINDOW 40003

void SetWindowTitle(HWND hwnd, TCHAR *szTitle)
{
    TCHAR szWindowTitle[MAX_TITLE_LENGTH];
    wsprintf(szWindowTitle, TEXT("%s - %s"), szTitle, APP_TITLE);
    SetWindowText(hwnd, szWindowTitle);
}

void ClearDocumentData(HWND hWnd)
{
    // Xóa dữ liệu trong Edit Control
    SetDlgItemText(hWnd, IDC_MAIN_EDIT, TEXT(""));

    // Đặt tiêu đề cửa sổ là "Untitled"
    SetWindowText(hWnd, TEXT("Untitled"));
}
void SaveDocument(HWND hWnd)
{
    OPENFILENAME ofn = {0};
    TCHAR szFileName[MAX_PATH] = {0};

    // Khởi tạo struct OPENFILENAME
    ofn.lStructSize = sizeof(ofn);
    ofn.hwndOwner = hWnd;
    ofn.lpstrFilter = TEXT("Text Files (*.txt)\0*.txt\0All Files (*.*)\0*.*\0");
    ofn.lpstrFile = szFileName;
    ofn.nMaxFile = MAX_PATH;
    ofn.Flags = OFN_EXPLORER | OFN_FILEMUSTEXIST | OFN_HIDEREADONLY;
    ofn.lpstrDefExt = TEXT("txt");

    // Hiển thị hộp thoại Save
    if (GetSaveFileName(&ofn))
    {
        // Mở file để ghi dữ liệu
        HANDLE hFile = CreateFile(ofn.lpstrFile, GENERIC_WRITE, 0, NULL, CREATE_ALWAYS, FILE_ATTRIBUTE_NORMAL, NULL);
        if (hFile == INVALID_HANDLE_VALUE)
        {
            MessageBox(hWnd, TEXT("Failed to create file."), TEXT("Error"), MB_OK | MB_ICONERROR);
            return;
        }

        // Ghi dữ liệu từ Edit Control vào file
        int nLength = GetWindowTextLength(GetDlgItem(hWnd, IDC_MAIN_EDIT));
        TCHAR *lpText = new TCHAR[nLength + 1];
        GetDlgItemText(hWnd, IDC_MAIN_EDIT, lpText, nLength + 1);
        DWORD dwWritten;
        WriteFile(hFile, lpText, nLength * sizeof(TCHAR), &dwWritten, NULL);
        delete[] lpText;

        // Đóng file
        CloseHandle(hFile);

        // Xóa dữ liệu của tài liệu hiện tại
        ClearDocumentData(hWnd);

        // Hiển thị thông báo thành công
        MessageBox(hWnd, TEXT("File saved successfully."), TEXT("Save"), MB_OK | MB_ICONINFORMATION);
    }
}

HWND hEdit;
TCHAR szFileName[MAX_PATH];

LRESULT CALLBACK WndProc(HWND hwnd, UINT msg, WPARAM wParam, LPARAM lParam)
{
    switch (msg)
    {
    case WM_CREATE:
    {
        // Tạo điều khiển Textbox
        hEdit = CreateWindowEx(
            WS_EX_CLIENTEDGE,
            TEXT("EDIT"),
            NULL,
            WS_CHILD | WS_VISIBLE | WS_VSCROLL | ES_MULTILINE | ES_AUTOVSCROLL,
            0, 0, 0, 0,
            hwnd,
            (HMENU)ID_EDIT,
            GetModuleHandle(NULL),
            NULL);
        HMENU hMenu = CreateMenu();
        HMENU hFileMenu = CreatePopupMenu();
        AppendMenu(hFileMenu, MF_STRING, ID_FILE_OPEN, TEXT("Open"));
        AppendMenu(hFileMenu, MF_STRING, ID_FILE_SAVE, TEXT("Save"));
        AppendMenu(hFileMenu, MF_SEPARATOR, 0, NULL);
        AppendMenu(hFileMenu, MF_STRING, ID_FILE_NEW, TEXT("New"));
        AppendMenu(hFileMenu, MF_STRING, ID_APP_EXIT, TEXT("Exit"));
        AppendMenu(hMenu, MF_POPUP, (UINT_PTR)hFileMenu, TEXT("File"));
        AppendMenu(hFileMenu, MF_STRING, ID_FILE_PRINT, TEXT("&Print"));
        AppendMenu(hFileMenu, MF_STRING, ID_FILE_NEW_WINDOW, TEXT("New Window"));
        HMENU hEditMenu = CreatePopupMenu();
        AppendMenu(hEditMenu, MF_STRING, ID_EDIT_COPY, TEXT("Copy"));
        AppendMenu(hEditMenu, MF_STRING, ID_EDIT_SELECT_ALL, TEXT("&SELECT ALL"));
        AppendMenu(hEditMenu, MF_STRING, ID_EDIT_ZOOM, TEXT("&Zoom to Full Screen")); // Thêm menu item mới
        AppendMenu(hMenu, MF_POPUP, (UINT_PTR)hEditMenu, TEXT("Edit"));
        AppendMenu(hEditMenu, MF_STRING, ID_EDIT_FIND, TEXT("Find\tCtrl+F"));

        SetMenu(hwnd, hMenu);
        break;
    }
    case WM_SIZE:
    {
        // Thay đổi kích thước của Textbox
        RECT rcClient;
        GetClientRect(hwnd, &rcClient);

        SetWindowPos(
            hEdit,
            NULL,
            0, 0,
            rcClient.right,
            rcClient.bottom,
            SWP_NOZORDER);

        break;
    }
    case WM_COMMAND:
    {
        switch (LOWORD(wParam))
        {
        case ID_FILE_OPEN:
        {
            OPENFILENAME ofn = {0};
            ofn.lStructSize = sizeof(ofn);
            ofn.hwndOwner = hwnd;
            ofn.lpstrFilter = TEXT("Text Files (*.txt)\0*.txt\0All Files (*.*)\0*.*\0");
            ofn.lpstrFile = szFileName;
            ofn.nMaxFile = MAX_PATH;
            ofn.Flags = OFN_EXPLORER | OFN_FILEMUSTEXIST | OFN_HIDEREADONLY;
            ofn.lpstrDefExt = TEXT("txt");

            if (GetOpenFileName(&ofn))
            {
                HANDLE hFile = CreateFile(
                    ofn.lpstrFile,
                    GENERIC_READ,
                    0,
                    NULL,
                    OPEN_EXISTING,
                    FILE_ATTRIBUTE_NORMAL,
                    NULL);

                if (hFile != INVALID_HANDLE_VALUE)
                {
                    DWORD dwFileSize = GetFileSize(hFile, NULL);
                    if (dwFileSize != INVALID_FILE_SIZE)
                    {
                        LPSTR lpText = (LPSTR)GlobalAlloc(GPTR, dwFileSize + 1);
                        if (lpText != NULL)
                        {
                            DWORD dwRead;
                            if (ReadFile(hFile, lpText, dwFileSize, &dwRead, NULL))
                            {
                                lpText[dwFileSize] = 0;
                                SetWindowTextA(hEdit, lpText);
                            }

                            GlobalFree(lpText);
                        }
                    }

                    CloseHandle(hFile);
                }
            }

            break;
        }
        case ID_FILE_SAVE:
        {
            OPENFILENAME ofn = {0};
            ofn.lStructSize = sizeof(ofn);
            ofn.hwndOwner = hwnd;
            ofn.lpstrFilter = TEXT("Text Files (*.txt)\0*.txt\0All Files (*.*)\0*.*\0");
            ofn.lpstrFile = szFileName;
            ofn.nMaxFile = MAX_PATH;
            ofn.Flags = OFN_EXPLORER | OFN_OVERWRITEPROMPT;
            ofn.lpstrDefExt = TEXT("txt");

            if (GetSaveFileName(&ofn))
            {
                HANDLE hFile = CreateFile(
                    ofn.lpstrFile,
                    GENERIC_WRITE,
                    0,
                    NULL,
                    CREATE_ALWAYS,
                    FILE_ATTRIBUTE_NORMAL,
                    NULL);

                if (hFile != INVALID_HANDLE_VALUE)
                {
                    DWORD dwTextLength = GetWindowTextLength(hEdit);
                    if (dwTextLength > 0)
                    {
                        LPSTR lpText = (LPSTR)GlobalAlloc(GPTR, dwTextLength + 1);
                        if (lpText != NULL)
                        {
                            GetWindowTextA(hEdit, lpText, dwTextLength + 1);

                            DWORD dwWritten;
                            if (!WriteFile(hFile, lpText, dwTextLength, &dwWritten, NULL))
                            {
                                MessageBox(hwnd, TEXT("Failed to save file!"), TEXT("Error"), MB_OK | MB_ICONERROR);
                            }

                            GlobalFree(lpText);
                        }
                    }

                    CloseHandle(hFile);
                }
            }

            break;
        }
        case ID_APP_EXIT:
        {
            // Display a confirmation message box to the user
            int result = MessageBox(hwnd, TEXT("Are you sure you want to exit?"), TEXT("Confirm Exit"), MB_YESNO | MB_ICONQUESTION);

            if (result == IDYES) // If the user clicked Yes, exit the application
            {
                DestroyWindow(hwnd);
            }

            break;
        }
        case ID_EDIT_SELECT_ALL:
        {
            // Lấy handle của cửa sổ để có thể gửi message
            HWND hWnd = GetActiveWindow();

            // Lấy handle của Edit Control
            HWND hEditCtrl = GetDlgItem(hWnd, IDC_MAIN_EDIT);

            // Lấy độ dài của văn bản trong Edit Control
            int len = GetWindowTextLength(hEditCtrl);

            // Chọn tất cả văn bản trong Edit Control
            SendMessage(hEditCtrl, EM_SETSEL, 0, len);

            break;
        }
        case ID_EDIT_ZOOM:
        {
            // Lấy handle của cửa sổ để có thể thao tác
            HWND hWnd = GetActiveWindow();

            // Lấy handle của Edit Control
            HWND hEditCtrl = GetDlgItem(hWnd, IDC_MAIN_EDIT);

            // Lấy kích thước của màn hình
            int cxScreen = GetSystemMetrics(SM_CXSCREEN);
            int cyScreen = GetSystemMetrics(SM_CYSCREEN);

            // Set kích thước mới cho Edit Control
            SetWindowPos(hEditCtrl, NULL, 0, 0, cxScreen, cyScreen, SWP_NOZORDER | SWP_NOMOVE);

            break;
        }
        case ID_FILE_NEW:
        {
            // Hỏi người dùng có muốn lưu tài liệu hiện tại hay không
            int result = MessageBox(hwnd, TEXT("Are you sure want to save current document before create new document else?"), TEXT("Save"), MB_YESNOCANCEL | MB_ICONQUESTION);
            if (result == IDYES)
            {
                // Nếu người dùng chọn "Yes", lưu tài liệu hiện tại trước khi tạo tài liệu mới
                SaveDocument(hwnd);
            }
            else if (result == IDNO)
            {
                // Nếu người dùng chọn "No", xóa dữ liệu của tài liệu hiện tại mà không lưu
                ClearDocumentData(hwnd);
            }
            else
            {
                // Nếu người dùng chọn "Cancel", không làm gì cả
                return 0;
            }

            // Tiếp tục tạo tài liệu mới
            ClearDocumentData(hwnd);
            TCHAR *myString = TEXT("Hello World");
            SetWindowTitle(hwnd, myString);
            break;
        }
        case ID_EDIT_FIND:
        {
            TCHAR szFindText[256] = {0};
            FINDREPLACE fr;
            ZeroMemory(&fr, sizeof(fr));
            fr.lStructSize = sizeof(FINDREPLACE);

            fr.lpstrFindWhat = szFindText;
            fr.wFindWhatLen = sizeof(szFindText);
            fr.Flags = FR_DOWN;

            // Hiển thị hộp thoại "Find"
            HWND hFindDlg = FindText(&fr);
            // Khởi tạo cấu trúc FINDREPLACE
            ZeroMemory(&fr, sizeof(fr));
            fr.lStructSize = sizeof(fr);
            fr.hwndOwner = hwnd;
            fr.lpstrFindWhat = szFindText;
            fr.Flags = FR_DOWN | FR_HIDEUPDOWN | FR_SHOWHELP;

            // Hiển thị hộp thoại tìm kiếm
            if (hFindDlg == NULL)
            {
                DWORD dwError = CommDlgExtendedError();
                if (dwError != 0)
                {
                    // Xử lý lỗi
                }
            }
            break;
        }
        
        }

        break;
    }
    case WM_DESTROY:
    {
        PostQuitMessage(0);
        break;
    }
    default:
    {
        return DefWindowProc(hwnd, msg, wParam, lParam);
    }
    }

    return 0;
}

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow)
{
    WNDCLASS wc = {0};
    wc.lpfnWndProc = WndProc;
    wc.hInstance = hInstance;
    wc.hbrBackground = (HBRUSH)(COLOR_WINDOW + 1);
    wc.lpszClassName = TEXT("Notepad");
    if (!RegisterClass(&wc))
    {
        MessageBox(NULL, TEXT("Failed to register window class!"), TEXT("Error"), MB_OK | MB_ICONERROR);
        return 0;
    }

    HWND hwnd = CreateWindowEx(
        0,
        TEXT("Notepad"),
        TEXT("Notepad"),
        WS_OVERLAPPEDWINDOW,
        CW_USEDEFAULT, CW_USEDEFAULT, CW_USEDEFAULT, CW_USEDEFAULT,
        NULL,
        NULL,
        hInstance,
        NULL);

    if (hwnd == NULL)
    {
        MessageBox(NULL, TEXT("Failed to create window!"), TEXT("Error"), MB_OK | MB_ICONERROR);
        return 0;
    }

    ShowWindow(hwnd, nCmdShow);

    MSG msg;
    while (GetMessage(&msg, NULL, 0, 0))
    {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    return (int)msg.wParam;
}