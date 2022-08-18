<?php

/** Core QGarden Model. Provide Some Basic Function To Working With Others. */
class Core extends DB
{
    /**
     * Pagination function.
     * @param int $TotalProduct Total product in with or without category.
     * @param int $CurrentPage User current in page.
     * @return string Paged HTML format.
     */
    public function Page (int $TotalProduct, int $CurrentPage)
    {
        $LimitPage = 5;

        $PagedHTML = '';

        $CurrentQuery = $_GET;

        $NextQuery = $_GET;
        $PrevQuery = $_GET;

        $LastQuery = $_GET;
        $FirstQuery = $_GET;

        $IsLastButtonHidden = '';
        $IsNextButtonHidden = '';

        $IsFirstButtonHidden = '';
        $IsPreviousButtonHidden = '';

        $TotalPage = ceil($TotalProduct / 12);

        if($CurrentPage === 1)
        {
            $IsFirstButtonHidden = 'hidden';
            $IsPreviousButtonHidden = 'hidden';
        }

        if ((int) $CurrentPage === (int) $TotalPage)
        {
            $IsLastButtonHidden = 'hidden';
            $IsNextButtonHidden = 'hidden';
        }

        $NextQuery['Page'] = $CurrentPage + 1;
        $LastQuery['Page'] = $TotalPage;


        $NextButton = '<li class="page-item '.$IsNextButtonHidden.'"><a class="page-link" href="?'.http_build_query($NextQuery).'">></a></li>';
        $LastButton = '<li class="page-item '.$IsLastButtonHidden.'"><a class="page-link" href="?'.http_build_query($LastQuery).'">>|</a></li>';

        $PrevQuery['Page'] = $CurrentPage - 1;
        $FirstQuery['Page'] = 1;

        $PreviousButton = '<li class="page-item '.$IsFirstButtonHidden.'"><a class="page-link" href="?'.http_build_query($PrevQuery).'"><</a></li>';
        $FirstButton = '<li class="page-item '.$IsPreviousButtonHidden.'"><a class="page-link" href="?'.http_build_query($FirstQuery).'">|<</a></li>';

        $PagedHTML .= $FirstButton.$PreviousButton;

        if ($CurrentPage <= $TotalPage && $TotalPage >= 1)
        {
            $PageBreak = 1;

            if ($CurrentPage > ($LimitPage / 2))
            {
                $CurrentQuery['Page'] = 1;

                $PagedHTML .= '<li class="page-item"><a class="page-link" href="?'.http_build_query($CurrentQuery).'">1</a></li>';
                $PagedHTML .= '<li class="page-item"><a class="page-link">...</a></li>';
            }

            $Loop = $CurrentPage;

            while ($Loop <= $TotalPage)
            {
                if ($PageBreak < $LimitPage)
                {
                    $CurrentQuery['Page'] = $Loop;

                    if ($CurrentPage === $Loop)
                    {
                        $PagedHTML .= '<li class="page-item active"><a class="page-link" href="?'.http_build_query($CurrentQuery).'">'.$Loop.'</a></li>';
                    } else $PagedHTML .= '<li class="page-item"><a class="page-link" href="?'.http_build_query($CurrentQuery).'">'.$Loop.'</a></li>';
                }

                $PageBreak++;
                $Loop++;
            }

            if ($CurrentPage < ($TotalPage - ($LimitPage / 2)))
            {
                $CurrentQuery['Page'] = $TotalPage;

                $PagedHTML .= '<li class="page-item"><a class="page-link" href="?'.http_build_query($CurrentQuery).'">...</a></li>';
                $PagedHTML .= '<li class="page-item"><a class="page-link" href="?'.http_build_query($CurrentQuery).'">'.$TotalPage.'</a></li>';
            }
        }

        return $PagedHTML.$NextButton.$LastButton;
    }

    /**
     * Get category as a list.
     * @return array|string Array of header menu.
     */
    public function BuildHeaderLink()
    {
        return $this -> QSelect("SELECT * FROM Category");
    }

    /**
     * @param int $CategoryID Current category ID.
     * @return array|string Return name of current category.
     */
    public function GetCategoryName(int $CategoryID)
    {
        return $this -> QSelectOneValue('SELECT CategoryName FROM Category WHERE CategoryID = '.$CategoryID);
    }

    /**
     * Return an input field of current $_GET Param.
     */
    public function BuildGetParam()
    {
        $CurrentURL = parse_url((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");

        if (array_key_exists('query', $CurrentURL)) $QueryArray = explode('&', $CurrentURL['query']);;

        $Input = '';



        foreach ($QueryArray as $String)
        {
            $CurrentField = explode( '=', $String);
            if ($CurrentField['0'] != 'Search') $Input .= '<input type="hidden" name="'.$CurrentField['0'].'" value="'.$CurrentField['1'].'">';
        }

        return $Input;
    }
}
