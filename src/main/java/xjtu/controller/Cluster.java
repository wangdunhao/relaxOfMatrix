package xjtu.controller;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import xjtu.service.Louvain;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.util.*;
import static java.net.URLDecoder.decode;

@RestController
@RequestMapping("/index")
public class Cluster {
    @Autowired
    private Louvain louvain;
    //聚类数据
    @RequestMapping(value = "/requestAndResponse", method = RequestMethod.POST)
    public List<Map<String,Integer>>  requestAndResponse(@RequestBody String relaxString) throws UnsupportedEncodingException {
        relaxString = decode(relaxString, "UTF-8");//解码
        System.out.println(relaxString);
        String[] s1 = relaxString.replaceAll("],", "]#").split("#");
        String[][] relaxData = new String[s1.length][];
        for (int i = 0; i < relaxData.length; i++) {
            String[] s2 = s1[i].split(",");
            relaxData[i] = new String[s2.length];
            for (int j = 0; j < s2.length; j++) {
                relaxData[i][j] = s2[j].replaceAll("\\[|\\]", "");
            }
        }
        for (String[] a : relaxData)  System.out.println(Arrays.toString(a));
        List<Map<String,Integer>> list=louvain.start(relaxData);
        return list;
    }
}

